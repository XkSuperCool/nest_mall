import { create, ConfigObject, CaptchaObj } from 'svg-captcha';

export default function createCaptcha(options?: ConfigObject): CaptchaObj {
  return create(Object.assign({
    width: 90, // 图片宽度
    height: 32, // 图片高度
    fontSize: 40, // 字体大小
    size: 4, // 验证码数量
    noise: 3, // 干扰线数量
    background: '#3786d6'
  }, options));
};
