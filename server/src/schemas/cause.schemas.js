import Joi from 'joi'

export const causeDataSchema = Joi.object({
    categoria_falta: Joi.string().required().min(1).max(100),
    calificacion_falta: Joi.string().required().min(1).max(10),
    descripcion_caso: Joi.string().required().min(5).max(500),
    evidencias: Joi.string().required().min(5).max(1000),
    id_articolo: Joi.string().required().min(5).max(10)
});
