import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';

import ValidatePipe from '../../pipe/validate.pipe';
import { AccessType } from '../../schema/access.schema';
import { AccessService } from '../../service/access.service';
import { ADMIN } from '../../config/routerPrefix';
import { IAccess } from '../../interface/access.interface';
import { accessValidate } from '../../validate/access.validate';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { createAccessError, moduleIdError, createAccessTypeError } from '../../model/errorInfo';

@Controller(ADMIN + '/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('create')
  async createAccess(@Body(new ValidatePipe(accessValidate)) body: IAccess) {
    /**
     * type validate
     * type = 0 & module_id = 0
     * type = 1 & module_id = (type = 0 的任意一个 _id)
     * type = 2 & module_id = (type = 1 的任意一个 _id)
     */
    let typeValidate = true;
    body.type = +body.type as AccessType;
    switch(true) {
      case body.type === 0 :
        typeValidate = body.module_id === '0';
        break;
      case body.type === 1 || body.type === 2:
        const result = await this.getAccessByType(body.type - 1 as AccessType);
        typeValidate = result.some(item => item._id.toString() === body.module_id.toString());
        break;
    }

    if (!typeValidate) {
      // type 校验失败
      return new ErrorModel(createAccessTypeError.status, createAccessTypeError.msg);
    }

    if (body.module_id !== '0') {
      try {
        body.module_id = Types.ObjectId(body.module_id as any);
      } catch {
        return new ErrorModel(moduleIdError.status, moduleIdError.msg);
      }
    }
    const result = await this.accessService.addAccess(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(createAccessError.status, createAccessError.msg);
    }
  }

  @Get(':type')
  async getAccessByType(@Param('type') type: AccessType) {
    return await this.accessService.getAccessByType(type);
  }
}