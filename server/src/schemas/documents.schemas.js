import joi from 'joi'

/* El código exporta una variable constante llamada `createDocumento` que se asigna a un esquema de
objeto Joi. */
export const createDocumento = joi.object({
    tipo_documento: joi.string().required().min(5).max(20)
});