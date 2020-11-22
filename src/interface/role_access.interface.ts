export interface RoleAccess {
  _id: string,
  checked: boolean,
  children?: RoleAccess[]
}

// export interface AddRoleAccess {
//   role_id: string,
//   accessIds: RoleAccess[]
// }

export interface AddRoleAccess {
  role_id: string,
  accessIds: string[]
}
