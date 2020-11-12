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
export const LoginValidateError = genErrorObj(40003, '请输入正确的用户名、密码!');
export const LoginError = genErrorObj(40004, '用户名或密码错误！');
