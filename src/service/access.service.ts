import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Access, AccessDocument } from '../schema/access.schema';

@Injectable()
export class AccessService {
  constructor(@InjectModel(Access.name) private readonly accessModel: Model<AccessDocument> ) {}
}