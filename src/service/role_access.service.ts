import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,  } from 'mongoose';
import { RoleAccess, RoleAccessDocument } from '../schema/role_access.schema';

@Injectable()
export class RoleAccessService {
  constructor(@InjectModel(RoleAccess.name) private readonly roleAccessModel: Model<RoleAccessDocument>) {}

  // 添加角色权限映射
  async addRoleAccess(role_id: string, access_id: string) {
    return new this.roleAccessModel({
      role_id,
      access_id
    }).save();
  }

  // 获取角色对应权限 id
  async getRoleAccess(role_id: string) {
    const result = await this.roleAccessModel.find({ role_id: role_id }).exec();
    return result.map(item => item.access_id);
  }

  // 删除用户的所有权限
  async deleteRoleAccess(role_id: string) {
    return await this.roleAccessModel.deleteMany({ role_id: role_id });
  }

  // 删除所有的对应 access_id 的权限
  async deleteByAccessId(access_id: string) {
    return await this.roleAccessModel.deleteMany({ access_id: access_id });
  }
}
