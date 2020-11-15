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

  async getAccessAll() {
    return await this.accessModel.find().exec();
  }
}