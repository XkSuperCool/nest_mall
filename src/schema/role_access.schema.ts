import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleAccessDocument = RoleAccess & Document;

@Schema()
export class RoleAccess {
  @Prop({
    required: true
  })
  role_id: string

  @Prop({
    required: true
  })
  access_id: string
}

export const RoleAccessSchema = SchemaFactory.createForClass(RoleAccess);
