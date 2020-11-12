import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import md5 from '../../utils/md5';
import createCaptcha from '../../utils/captcha';
import { AdminService } from '../../service/admin.service';
import { ErrorModel, SuccessModel } from '../../model/ResModel';

import { AdminLogin } from '../../interface/admin.interface';
import { captchaError, LoginValidateError, LoginError } from '../../model/errorInfo';
import { ADMIN } from '../../config/routerPrefix';

@Controller(ADMIN)
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Get('')
  index() {
    return 'ADMIN';
  }

  // 获取验证码
  @Get('captcha')
  getCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = createCaptcha();
    (req.session as any).captcha = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 管理员登录
  @Post('login')
  async login(@Body() body: AdminLogin, @Req() req: Request, @Res() res: Response) {
    // eslint-disable-next-line prefer-const
    let { username, password, captcha } = body;

    if (captcha?.toLocaleUpperCase() !== (req.session as any).captcha?.toLocaleUpperCase()) {
      return res.send(new ErrorModel(captchaError.status, captchaError.msg));
    }

    if (!username || !password) {
      return res.send(new ErrorModel(LoginValidateError.status, LoginValidateError.msg));
    }

    password = md5(password);
    const result = await this.adminService.getLoginAdmin(username, password);

    if (result === null) {
      res.send(new ErrorModel(LoginError.status, LoginError.msg));
    } else {
      (req.session as any).userInfo = result;
      res.send(new SuccessModel('ok'));
    }
  }

  // 退出登录
  @Post('logout')
  logout(@Req() req: Request) {
    (req.session as any).userInfo = null;
    return new SuccessModel('ok');
  }
}