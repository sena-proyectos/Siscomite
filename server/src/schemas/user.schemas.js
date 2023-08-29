import Joi from 'joi'

/* `const PASSWORD_REGEX` define un patrón de expresión regular que se usa para validar contraseñas. */
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

/* El código define un esquema utilizando la biblioteca Joi para validar los datos de inicio de sesión
de un usuario. El esquema especifica que el campo `numero_documento` es obligatorio y debe ser una
cadena con una longitud mínima de 8 caracteres y una longitud máxima de 50 caracteres. El campo
`contrasena` también es obligatorio y debe ser una cadena con una longitud mínima de 8 caracteres,
una longitud máxima de 300 caracteres y debe coincidir con el patrón de expresión regular de
contraseña especificado. */
export const loginDataSchema = Joi.object({
    numero_documento: Joi.string().required().min(8).max(50),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})

/* El código está definiendo un esquema para validar los datos necesarios para el registro del usuario. */
export const registerDataSchema = Joi.object({
    nombres: Joi.string().required().min(2).max(50),
    apellidos: Joi.string().required().min(2).max(45),
    email_sena: Joi.string().email().required().min(5).max(60),
    numero_celular: Joi.string().required().min(5).max(15),
    numero_documento: Joi.string().required().min(8).max(50),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})

export const searchUsers = Joi.object({
    
})