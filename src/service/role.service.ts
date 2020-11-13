import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../schema/role.schema';

import { IRole, UpdateRole } from '../interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleService: Model<RoleDocument> ) {}

  async addRole(roleJSON: IRole) {
    return await new this.roleService(roleJSON).save();
  }

  async findRoleAll() {
    return await this.roleService.find().exec();
  }

  async deleteRole(id: string) {
    try {
      return await this.roleService.deleteOne({ _id: id });
    } catch {
      return null;
    }
  }

  async updateRole(id: string, data: UpdateRole) {
    try {
      return await this.roleService.updateOne({ _id: id }, data);
    } catch {
      return null;
    }
  }

  async findOneRole(id: string) {
    try {
      return await this.roleService.findOne({ _id: id }).exec();
    } catch {
      return null;
    }
  }
}
