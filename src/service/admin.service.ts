import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../schema/admin.schema';
import { IAdmin } from '../interface/admin.interface';

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

  /**
   * 添加管理员
   * @param data 管理员数据
   */
  async addAdmin(data: IAdmin) {
    return await new this.AdminModel(data).save();
  }

  /**
   * 修改管理员信息
   * @param id 管理员 id
   * @param data 新管理员数据
   */
  async updateAdmin(id: Types.ObjectId, data: Partial<IAdmin>) {
    try {
      return await this.AdminModel.updateOne({ _id: id }, data);
    } catch {
      return null;
    }
  }

  /**
   * 删除对应 id 的管理员
   * @param id 管理员 id
   */
  async deleteAdminOne(id: Types.ObjectId) {
    try {
      return await this.AdminModel.deleteOne({ _id: id });
    } catch {
      return null;
    }
  }

  /**
   * 获取一条管理员信息，根据对应 id
   * @param id 管理员 id
   */
  async getAdminOne(id: string): Promise<any[] | any> {
    try {
      return await this.AdminModel.aggregate([
        {
          $project: {
            password: 0
          }
        },
        {
          $match: {
            _id: Types.ObjectId(id)
          }
        }
      ]);
    } catch (e) {
      return [];
    }
  }

  /**
   * 获取所有的管理员
   */
  async getAdminAll() {
    return await this.AdminModel.aggregate([
      {
        $project: {
          password: 0
        }
      },
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role'
        }
      }
    ])
  }
}
