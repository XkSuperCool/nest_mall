import { Types } from 'mongoose';

export interface AdminLogin {
  username: string
  password: string
  captcha: string
}

export interface IAdmin {
  username: string
  password: string
  mobile: string
  email?: string
  status?: boolean
  role_id: Types.ObjectId
  is_super?: boolean
}

export interface UpdateAdmin {
  id: Types.ObjectId
  data: Partial<IAdmin>
}
