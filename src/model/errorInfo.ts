interface ResErrorObj {
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
