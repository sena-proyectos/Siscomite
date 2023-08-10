import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const loginDataSchema = Joi.object({
    numero_documento: Joi.string().required().min(8).max(50),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})

export const registerDataSchema = Joi.object({
    nombres: Joi.string().required().min(2).max(50),
    apellidos: Joi.string().required().min(2).max(45),
    email_sena: Joi.string().email().required().min(5).max(60),
    numero_celular: Joi.string().required().min(5).max(15),
    numero_documento: Joi.string().required().min(8).max(50),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})
