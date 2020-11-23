import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { Types } from 'mongoose';

import ValidatePipe from '../../pipe/validate.pipe';
import { AccessType } from '../../schema/access.schema';
import { AccessService } from '../../service/access.service';
import { RoleAccessService } from '../../service/role_access.service';
import { ADMIN } from '../../config/routerPrefix';
import { IAccess } from '../../interface/access.interface';
import { accessValidate } from '../../validate/access.validate';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { createAccessError, moduleIdError, createAccessTypeError } from '../../model/errorInfo';

@Controller(ADMIN + '/access')
export class AccessController {
  constructor(private readonly accessService: AccessService, private readonly raService: RoleAccessService) {}

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
        const { data } = await this.getAccessByType(body.type - 1 as AccessType);
        typeValidate = data.some(item => item._id.toString() === body.module_id.toString());
        break;
    }

    if (!typeValidate) {
      // type 校验失败
      return new ErrorModel(createAccessTypeError.status, createAccessTypeError.msg);
    }

    if (body.module_id !== '0') {
      try {
        body.module_id = Types.ObjectId(body.module_id);
      } catch {
        return new ErrorModel(moduleIdError.status, moduleIdError.msg);
      }
    }
    /**
     * 如果添加的是菜单/操作，则需要根据 module_id 去 roleAccess 表中，将 access_id ==  module_id 的项删除，
     * 因为新增加的项，必然没有角色关联，则此时其父项不应该存在
     */
    if (body.type === 1 || body.type === 2) {
      await this.raService.deleteByAccessId(body.module_id.toString());

      // 如果是操作，还需要进一步删除
      if (body.type === 2) {
        // 获取菜单父项 id，并删除
        const parentId = (await this.accessService.getAccessById(body.module_id)).module_id;
        await this.raService.deleteByAccessId(parentId.toString());
      }
    }
    const result = await this.accessService.addAccess(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(createAccessError.status, createAccessError.msg);
    }
  }

  @Get()
  async getAccessByType(@Query('type') type: AccessType) {
    const result = await this.accessService.getAccessByType(type);
    return new SuccessModel(result);
  }

  @Get('all')
  async getAccessListTree() {
    const result = await this.accessService.getAccessTree();
    return new SuccessModel(result);	
  }
}
