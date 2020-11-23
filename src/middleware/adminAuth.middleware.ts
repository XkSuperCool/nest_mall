import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import * as url from 'url'

import { ErrorModel } from '../model/ResModel';
import { notLoginError, authError, unknownError } from '../model/errorInfo';
import { RoleAccessService } from '../service/role_access.service';
import { AccessService } from '../service/access.service';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(private readonly raService: RoleAccessService, private readonly acService: AccessService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userInfo = (req.session as any).userInfo;
    if (!userInfo) {
      return res.send(new ErrorModel(notLoginError.status, notLoginError.msg));
    }

    const { role_id } = userInfo;
    // 不是超级管理员的话进行权限验证
    if (!userInfo.is_super) {
      try {
        // 获取当前登录管理员所有的权限 id
        const accessQuery = (await this.raService.getRoleAccess(role_id)).map(id => ({
          _id: Types.ObjectId(id)
        }));
        if (accessQuery.length === 0) {
          return res.send(new ErrorModel(authError.status, authError.msg));
        }
        // 获取对应的权限 urls
        const urls = await this.acService.getAccessByIds(accessQuery);
        let originalUrl = req.originalUrl;
        // 去掉查询参数
        const search = url.parse(originalUrl).search;
        if (search !== null) {
          originalUrl = originalUrl.replace(search, '');
        }
        if (!urls.includes(originalUrl)) {
          return res.send(new ErrorModel(authError.status, authError.msg));
        }
      } catch {
        return res.send(new ErrorModel(unknownError.status, unknownError.msg));
      }
    }
    next();
  }
}
