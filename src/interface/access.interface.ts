import { AccessType } from '../schema/access.schema';
export interface IAccess {
  module_name: string
  action_name?: string
  type: AccessType
  url: string
  status?: boolean
  module_id: any
  sort?: number
  description?: string
  create_time?: number
}
