import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ErrorModel } from '../model/ResModel';
import { notLoginError } from '../model/errorInfo';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!(req.session as any).userInfo) {
      return res.send(new ErrorModel(notLoginError.status, notLoginError.msg));
    }
    next();
  }
}
