import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Document & Role;

@Schema()
export class Role {
  @Prop({
    required: true
  })
  roleName: string;

  @Prop({
    default: ''
  })
  description: string;

  @Prop({
    default: true
  })
  status: boolean;

  @Prop({
    default: Date.now()
  })
  create_time: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
