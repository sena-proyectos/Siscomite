import joi from 'joi'

export const createDocumento = joi.object({
    tipo_documento: joi.string().required().min(5).max(20)
});