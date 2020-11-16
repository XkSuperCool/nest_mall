import { Schema, SchemaFactory, Prop} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccessDocument = Access & Document;

export type AccessType = 0 | 1 | 2;

@Schema()
export class Access {
  @Prop({
    required: true
  })
  module_name: string

  @Prop({
    default: ''
  })
  action_name: string;

  @Prop({
    required: true
  })
  type: AccessType; // 权限类型，0：块模 1：菜单 2: 操作

  @Prop({
    required: true
  })
  url: string // 对应的链接

  @Prop({
    default: true
  })
  status: boolean;

  @Prop({
    required: true
  })
  module_id: string // '0'：顶级模块，objectId: 对应的父级模块 _id

  @Prop({
    default: 0
  })
  sort: number

  @Prop({
    default: ''
  })
  description: string

  @Prop({
    default: Date.now()
  })
  create_time: number
}

export const AccessSchema = SchemaFactory.createForClass(Access);
