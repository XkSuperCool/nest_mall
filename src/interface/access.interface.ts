import { Schema } from 'mongoose';

export interface IAccess {
  module_name: string
  action_name?: string
  type: number
  url: string
  status?: boolean
  module_id: Schema.Types.Mixed
  sort?: number
  description?: string
  create_time?: number
}
