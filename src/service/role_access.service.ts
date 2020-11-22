import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,  } from 'mongoose';
import { RoleAccess, RoleAccessDocument } from '../schema/role_access.schema';

@Injectable()
export class RoleAccessService {
  constructor(@InjectModel(RoleAccess.name) private readonly roleAccessModel: Model<RoleAccessDocument>) {}

  async addRoleAccess(role_id: string, access_id: string) {
    return new this.roleAccessModel({
      role_id,
      access_id
    }).save();
  }

  async getRoleAccess(role_id: string) {
    const result = await this.roleAccessModel.find({ role_id: role_id }).exec();
    return result.map(item => item.access_id);
  }

  async deleteRoleAccess(role_id: string) {
    return await this.roleAccessModel.deleteMany({ role_id: role_id });
  }
}
