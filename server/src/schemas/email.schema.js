import Joi from 'joi'

export const emailSchema = Joi.object({
  to: Joi.string().required(),
  title: Joi.string().required()
})
