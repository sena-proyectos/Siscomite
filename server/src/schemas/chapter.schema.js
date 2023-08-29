import Joi from 'joi'

export const chapterDataSchema = Joi.object({
    titulo: Joi.string().required().min(1).max(10),
    descripcion_capitulo: Joi.string().required().min(5).max(2000)
});
