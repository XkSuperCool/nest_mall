import * as joi from 'joi';
import { string } from 'joi';

export const adminLoginValidate = joi.object().keys({
  username: joi.string().min(5).max(10).required(),
  password: joi.string().min(6).max(15).required(),
  captcha: joi.string().required()
})

export const adminValidate = joi.object().keys({
  username: joi.string().min(5).max(10).required(),
  password: joi.string().min(6).max(15).required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/),
  mobile: joi.string().required().regex(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/),
  email: joi.string().email(),
  status: joi.boolean(),
  role_id: joi.string().required(),
  is_super: joi.boolean()
})

export const updateAdminValidate = joi.object().keys({
  id: string().required(),
  data: {
    username: joi.string().min(5).max(10),
    password: joi.string().min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/),
    mobile: joi.string().regex(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/),
    email: joi.string().email(),
    status: joi.boolean(),
    role_id: joi.string(),
    is_super: joi.boolean()
  }
})