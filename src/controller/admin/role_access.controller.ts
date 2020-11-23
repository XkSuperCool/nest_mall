import { Body, Controller, Param, Get, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { RoleAccessService } from '../../service/role_access.service';
import { AccessService } from '../../service/access.service';
import { AddRoleAccess } from '../../interface/role_access.interface';
import { SuccessModel, ErrorModel } from '../../model/ResModel';
import { updateRoleAccess, accessIdError } from '../../model/errorInfo';
import { ADMIN } from '../../config/routerPrefix';

@Controller(ADMIN + '/role/access')
export class RoleAccessController {
  constructor(private readonly service: RoleAccessService, private readonly acService: AccessService) {}

  // antd tree component 格式 api

  // 获取角色对应的权限
  @Get(':id')
  async getRoleAccessByRoleId(@Param('id') id: string) {
    const [access, ids] = await Promise.all([
      this.acService.getAccessTree(),
      this.service.getRoleAccess(id)
    ]);
    return new SuccessModel({
      tree: access,
      ids: ids
    });
  }

  // 修改角色对应的权限
  @Put('update')
  async updateRoleAccess(@Body() body: AddRoleAccess) {
    // 删除该角色以前的权限
    const deleteRes = await this.service.deleteRoleAccess(body.role_id);
    if (deleteRes.ok) {
      // 添加新权限
      for (const id of body.accessIds) {
        await this.service.addRoleAccess(body.role_id, id);
      }
      return new SuccessModel('ok');
    } else {
      return new ErrorModel(updateRoleAccess.status, updateRoleAccess.msg);
    }
  }

  // 获取角色对应权限的 url
  @Get('urls')
  async getRoleAccessUrls(@Query('roleId') roleId: string) {
    const access_ids = await this.service.getRoleAccess(roleId);
    let urls = [];
    try {
      urls = await this.acService.getAccessByIds(access_ids.map(id => ({
        _id: Types.ObjectId(id)
      })));
    } catch {
      return new ErrorModel(accessIdError.status, accessIdError.msg);
    }
    return new SuccessModel(urls);
  }

  // 获取权限过滤侧边栏菜单
  @Get('menu')
  async getRoleAccessMenu(@Query('roleId') roleId: string) {
    const accessTree = await this.acService.getAccessTree(true);
    return new SuccessModel(accessTree);
  }
}

/*
  // 生成权限 ids
  private generateAccessIds(arr: RoleAccess[]) {
    const ids = [];
    for (const value of arr) {
      if (value.checked) {
        if (value.children && Array.isArray(value.children) && value.children.length) {
          const children = value.children.filter(child => child.checked);
          if (!children.length) {
            continue;
          }
          ids.push(value._id);
          ids.push(...this.generateAccessIds(children));
        } else if (value.checked) {
          ids.push(value._id);
        }
      }
    }
    return ids;
  }

  // 添加角色对应的权限
  @Post('/create')
  async createRoleAccess(@Body() body: AddRoleAccess) {
    const ids = this.generateAccessIds(body.accessIds);
    // 循环添加角色对应的权限
    for (const id of ids) {
      await this.service.addRoleAccess(body.role_id, id);
    }

    return new SuccessModel('ok');
  }

  // 修改角色对应的权限
  @Put('update')
  async updateRoleAccess(@Body() body: AddRoleAccess) {
    // 删除该角色以前的权限
    const deleteRes = await this.service.deleteRoleAccess(body.role_id);
    if (deleteRes.ok) {
      // 添加新权限
      const ids = this.generateAccessIds(body.accessIds);
      for (const id of ids) {
        await this.service.addRoleAccess(body.role_id, id);
      }
      return new SuccessModel('ok');
    } else {
      return new ErrorModel(updateRoleAccess.status, updateRoleAccess.msg);
    }
  }

  // 获取角色对应的权限
  @Get(':id')
  async getRoleAccessByRoleId(@Param('id') id: string) {
    // 1. 查询获取权限数组、角色对应的权限 ids
    // eslint-disable-next-line prefer-const
    let [access, ids] = await Promise.all([
      this.acService.getAccessTree(),
      this.service.getRoleAccess(id)
    ]);
    // 2. 递归设置 checked
    function generateAccess(arr, ids) {
      arr = JSON.parse(JSON.stringify(arr));
      for (const item of arr) {
        if (ids.includes(item._id)) {
          item.checked = true;
          if (item.children && Array.isArray(item.children) && item.children.length) {
            generateAccess(item.children, ids);
          }
        }
      }
      return arr;
    }
    access = generateAccess(access, ids);

    return new SuccessModel(access);
  }

*/
