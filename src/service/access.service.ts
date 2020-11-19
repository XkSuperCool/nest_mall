import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Access, AccessDocument, AccessType } from '../schema/access.schema';
import { IAccess } from '../interface/access.interface';

@Injectable()
export class AccessService {
  constructor(@InjectModel(Access.name) private readonly accessModel: Model<AccessDocument> ) {}

  async addAccess(data: IAccess) {
    return await new this.accessModel(data).save();
  }

  async getAccessByType(type: AccessType) {
    return await this.accessModel.find({ type: type }).exec();
  }

  async getAccessThree() {
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
}