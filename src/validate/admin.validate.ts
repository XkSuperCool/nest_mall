import * as joi from 'joi';

export const adminLoginValidate = joi.object().keys({
  username: joi.string().min(5).max(10).required(),
  password: joi.string().min(6).max(15).required(),
  captcha: joi.string().required()
})

// .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/)
