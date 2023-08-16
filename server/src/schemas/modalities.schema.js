import joi from 'joi'

/* El código exporta una variable constante llamada `createModalities` que se asigna a un esquema de
objeto Joi. */
export const createModalities = joi.object({
    nombre_modalidad: joi.string().required().min(5).max(100)
});