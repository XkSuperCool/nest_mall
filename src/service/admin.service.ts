import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private AdminModel: Model<AdminDocument>) {}

  /**
   * 获取登录管理员信息
   * @param username 用户名
   * @param password 密码
   */
  async getLoginAdmin(username: string, password: string) {
    const result = await this.AdminModel.findOne({
      username,
      password
    }).exec();
    return result;
  }
}
