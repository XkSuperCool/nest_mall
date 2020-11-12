import { create, ConfigObject, CaptchaObj } from 'svg-captcha';

export default function createCaptcha(options?: ConfigObject): CaptchaObj {
  return create(Object.assign({
    size: 4, // 验证码数量
    noise: 3, // 干扰线数量
    background: '#3786d6'
  }, options));
};
