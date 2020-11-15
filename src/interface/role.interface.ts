export interface IRole {
  roleName: string
  description?: string
  status?: boolean
  create_time?: number
}

export type UpdateRole = Omit<Partial<IRole>, 'create_time'>
export interface UpdateRoleBody {
  id: string
  data: UpdateRole
}
