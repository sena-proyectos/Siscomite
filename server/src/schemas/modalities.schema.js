import joi from 'joi'

export const createModalities = joi.object({
    nombre_modalidad: joi.string().required().min(5).max(100)
});