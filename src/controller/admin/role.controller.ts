import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import ValidatePipe from '../../pipe/validate.pipe';
import { IRole, UpdateRoleBody } from '../../interface/role.interface';
import { RoleService } from '../../service/role.service';
import { ADMIN } from '../../config/routerPrefix';
import { createRoleValidate, updateRoleValidate } from '../../validate/role.validate';
import { SuccessModel, ErrorModel } from '../../model/ResModel';
import {
  createRoleError,
  deleteRoleError,
  updateRoleError,
  getRoleInfoError
} from '../../model/errorInfo';

@Controller(ADMIN + '/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 获取所有角色
  @Get()
  async getRoleAll() {
    return await this.roleService.findRoleAll();
  }

  // 创建角色
  @Post('create')
  async createRole(@Body( new ValidatePipe(createRoleValidate) ) body: IRole) {
    if (body instanceof ErrorModel) {
      return body;
    }
    const { roleName, description, status } = body;
    const result = await this.roleService.addRole({ roleName, description, status });
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(createRoleError.status, createRoleError.msg);
    }
  }

  // 删除角色
  @Delete('delete')
  async deleteRoleById(@Body('id') id: string) {
    const result = await this.roleService.deleteRole(id);
    if (result?.ok) {
      return new SuccessModel('ok');
    } else {
      return new ErrorModel(deleteRoleError.status, deleteRoleError.msg);
    }
  }

  // 更新角色
  @Put('update')
  async updateRoleById(@Body(new ValidatePipe(updateRoleValidate)) body: UpdateRoleBody) {
    if (body instanceof ErrorModel) {
      return body;
    }
    const result = await this.roleService.updateRole(body.id, body.data);
    if (result?.ok) {
      return new SuccessModel('ok');
    } else {
      return new ErrorModel(updateRoleError.status, updateRoleError.msg);
    }
  }

  // 获取指定 id 的角色
  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    const result =  await this.roleService.findOneRole(id);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel(getRoleInfoError.status, getRoleInfoError.msg);
    }
  }
}