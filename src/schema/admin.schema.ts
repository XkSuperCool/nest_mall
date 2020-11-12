import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({
    required: true
  })
  username: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    required: true
  })
  mobile: number;

  @Prop()
  email: string;

  @Prop()
  status: boolean;

  @Prop()
  role_id: Types.ObjectId;

  @Prop({
    default: Date.now()
  })
  create_time: number;

  @Prop({
    default: false
  })
  is_super: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
