import * as joi from 'joi';

export const createRoleValidate = joi.object().keys({
  roleName: joi.string().required().min(3).max(10),
  status: joi.boolean(),
  description: joi.string().min(5).max(200)
})

export const updateRoleValidate = joi.object().keys({
  id: joi.string(),
  data: {
    roleName: joi.string().min(3).max(10),
    status: joi.boolean(),
    description: joi.string().min(5).max(200)
  }
})
