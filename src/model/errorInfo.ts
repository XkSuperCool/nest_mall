export interface ResErrorObj {
  status: number,
  msg: string
}

function genErrorObj(status: number, msg: string): ResErrorObj {
  return { status, msg };
}

export const notLoginError = genErrorObj(40000, '尚未登陆，请先登录！');
export const authError = genErrorObj(40001, '权限不够，无法进行下一步操作！');
export const captchaError = genErrorObj(40002, '验证码错误!');
export const LoginError = genErrorObj(40003, '用户名或密码错误！');
export const createRoleError = genErrorObj(40004, '创建角色失败！');
export const deleteRoleError = genErrorObj(40005, '删除角色失败！');
export const updateRoleError = genErrorObj(40007, '更新角色信息失败！');
export const getRoleInfoError = genErrorObj(40008, '获取角色信息失败！');
export const createAdminError = genErrorObj(40009, '创建管理员失败！');
export const roleObjectIdError = genErrorObj(40010, 'role_id 字段不匹配！');
export const deleteAdminError = genErrorObj(40011, '删除管理员失败！');
export const updateAdminError = genErrorObj(40012, '更新管理员失败！');
export const createAccessError = genErrorObj(40013, '创建权限失败');
export const moduleIdError = genErrorObj(40010, 'module_id 字段不匹配！');
export const createAccessTypeError = genErrorObj(40015, 'module_id 字段和 type 不匹配！');
export const updateRoleAccess = genErrorObj(40016, '修改角色权限失败！');
export const unknownError = genErrorObj(50000, '出现未知错误，请稍后重试！');
export const accessIdError = genErrorObj(40010, 'access_id 字段不匹配！');
