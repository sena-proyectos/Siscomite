import Joi from 'joi'

export const articleDataSchema = Joi.object({
    numero_articulo: Joi.string().required().min(1).max(10),
    prohibicion_articulo: Joi.string().required().min(1).max(10),
    descripcion_articulo: Joi.string().required().min(5).max(500)
});

