import { boolean, number, object, string } from 'joi';

export const accessValidate = object().keys({
  module_name: string().required(),
  action_name: string(),
  type: string().required().regex(/[0|1|2]{1}$/),
  url: string().required(),
  status: boolean(),
  module_id: string().required(),
  sort: number(),
  description: string().max(200)
})
