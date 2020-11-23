import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Access, AccessDocument, AccessType } from '../schema/access.schema';
import { IAccess } from '../interface/access.interface';

@Injectable()
export class AccessService {
  constructor(@InjectModel(Access.name) private readonly accessModel: Model<AccessDocument> ) {}

  // 添加权限
  async addAccess(data: IAccess) {
    return await new this.accessModel(data).save();
  }

  // 根据 type 获取权限
  async getAccessByType(type: AccessType) {
    return await this.accessModel.find({ type: type }).exec();
  }

  // 获取权限树
  async getAccessTree() {
    const result = await this.accessModel.aggregate([
      {
        $match: {
          type: 0
        }
      },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'children'
        },
      },
    ]);

    // 获取三级
    for(const item of result) {
      for (const child of item.children) {
        child.children = await this.accessModel.aggregate([
          {
            $match: {
              module_id: child._id
            }
          }
        ])
      }
    }

    return result;
  }

  // $or 获取 ids 对应的权限
  async getAccessByIds(ids: any[]) {
    const res = await this.accessModel.find({
      $or: ids
    }, { url: 1 });
    return res.map(item => item.url);
  }

  // 根据 id 获取权限
  async getAccessById(id: Schema.Types.ObjectId) {
    return await this.accessModel.findOne({ _id: id }, { module_id: 1 });
  }

  // 根据角色获取权限树
  async getAccessTreeByRole() {
    return await this.accessModel.aggregate([
      {
        $match: {
          type: 0,
          
        }
      },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'children'
        },
      },
    ]);
  }
}
