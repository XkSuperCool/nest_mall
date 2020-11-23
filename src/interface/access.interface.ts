import { AccessType } from '../schema/access.schema';
export interface IAccess {
  _id?: string
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

export interface AccessTree extends IAccess {
  children: AccessTree[]
}
