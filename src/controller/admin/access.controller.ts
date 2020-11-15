import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AccessType } from '../../schema/access.schema';
import { AccessService } from '../../service/access.service';
import { ADMIN } from '../../config/routerPrefix';
import { IAccess } from '../../interface/access.interface';
import { ErrorModel, SuccessModel } from '../../model/ResModel';
import { createAccessError } from '../../model/errorInfo';

@Controller(ADMIN + '/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('create')
  async createAccess(@Body() body: IAccess) {
    // if (new Schema.Types.Mixed(body.module_id as any) !== new Schema.Types.Mixed('0')) {
    //   body.module_id = new Schema.Types.ObjectId(body.module_id as any);
    // }
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