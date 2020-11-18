import { Body, Controller, Delete, Get, Post, Put, Req, Res, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Request, Response } from 'express';

import md5 from '../../utils/md5';
import createCaptcha from '../../utils/captcha';
import ValidatePipe from '../../pipe/validate.pipe';
import { errorReturn, excludeAttributes } from '../../utils';
import { AdminService } from '../../service/admin.service';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { AdminLogin, IAdmin, UpdateAdmin } from '../../interface/admin.interface';
import { ADMIN } from '../../config/routerPrefix';
import { adminLoginValidate, adminValidate, updateAdminValidate } from '../../validate/admin.validate';
import {
  captchaError,
  LoginError,
  createAdminError,
  roleObjectIdError,
  deleteAdminError,
  updateAdminError
} from '../../model/errorInfo';

@Controller(ADMIN)
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  // 获取验证码
  @Get('captcha')
  getCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = createCaptcha();
    (req.session as any).captcha = captcha.text;
    console.log(captcha.text);
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 管理员登录
  @Post('login')
  async login(@Body(new ValidatePipe(adminLoginValidate)) body: AdminLogin, @Req() req: Request, @Res() res: Response) {
    // eslint-disable-next-line prefer-const
    let { username, password, captcha } = body;
    if (captcha?.toLocaleUpperCase() !== (req.session as any).captcha?.toLocaleUpperCase()) {
      return res.send(new ErrorModel(captchaError.status, captchaError.msg));
    }

    password = md5(password);
    const result = await this.adminService.getLoginAdmin(username, password);

    if (result === null) {
      res.send(new ErrorModel(LoginError.status, LoginError.msg));
    } else {
      (req.session as any).userInfo = result;
      res.send(new SuccessModel(excludeAttributes(result, 'password')));
    }
  }

  // 退出登录
  @Post('logout')
  logout(@Req() req: Request) {
    (req.session as any).userInfo = null;
    return new SuccessModel('ok');
  }

  // 创建管理员
  @Post('create')
  async createAdmin(@Body(new ValidatePipe(adminValidate)) body: IAdmin) {
    try {
      body.role_id = Types.ObjectId(body.role_id as any);
    } catch {
      return new ErrorModel(roleObjectIdError.status, roleObjectIdError.msg);
    }
    const result = await this.adminService.addAdmin(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(createAdminError.status, createAdminError.msg);
    }
  }

  // 删除管理员
  @Delete('delete')
  async deleteAdminById(@Body('id') id) {
    const result = await this.adminService.deleteAdminOne(id);
    return errorReturn(result, deleteAdminError);
  }

  // 修改管理员信息
  @Put('update')
  async updateAdminById(@Body(new ValidatePipe(updateAdminValidate)) body: UpdateAdmin) {
    const { id, data } = body;
    if (data.password) {
      data.password = md5(data.password);
    }
    if (data.role_id) {
      data.role_id = Types.ObjectId(data.role_id as any);
    }
    const result = await this.adminService.updateAdmin(id, data);
    return errorReturn(result, updateAdminError);
  }

  // 获取一个管理成员
  @Get('member')
  async getAdminInfoById(@Query('id') id: string) {
    const result = await this.adminService.getAdminOne(id);
    return new SuccessModel(result[0] ?? {});
  }

  // 获取所有管理成员
  @Get()
  async getAdminList() {
    const result = await this.adminService.getAdminAll();
    return new SuccessModel(result);
  }
}
