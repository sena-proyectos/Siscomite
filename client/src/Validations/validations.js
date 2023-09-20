import Joi from 'joi'

// Regex de resctriciones para la contraseña
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ 
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/


// Validaciones para el login
export const validationLogin = Joi.object({
    numero_documento: Joi.number().required().min(8),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})

// Validaciones para el registro de ususario
export const validationRegister = Joi.object({
    nombres: Joi.string().required().min(2),
    apellidos: Joi.string().required().min(2),
    email_sena: Joi.string().required().min(5),
    numero_celular: Joi.number().required().min(5),
    numero_documento: Joi.number().required().min(8),
    contrasena: Joi.string().required().min(8).pattern(PASSWORD_REGEX),
})

// Validaciones para registrar fichas
export const validationGroups = Joi.object({
    numero_ficha: Joi.number().required().min(2),
    nombre_programa: Joi.string().required().min(2).max(100),
    jornada: Joi.string().required().min(5).max(60),
    etapa_programa: Joi.string().required().min(5).max(35),
    numero_trimestre: Joi.number().required().min(0).max(20),
  })

// Validaciones para ingresar aprendices manualmente
export const validationStudents = Joi.object({
    nombres_aprendiz: Joi.string().required().min(3).max(100),
    apellidos_aprendiz: Joi.string().required().max(100),
    numero_documento_aprendiz: Joi.number().required().min(8),
    email_aprendiz_sena: Joi.string().required().min(5).max(100).pattern(EMAIL_REGEX),
    celular_aprendiz: Joi.number().required().min(9),
    id_documento: Joi.string().required().max(15),
    id_ficha: Joi.string().required().max(15)
})
