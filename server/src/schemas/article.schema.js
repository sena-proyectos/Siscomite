import Joi from 'joi'

/* El código exporta una variable constante llamada `articleDataSchema`, que es un objeto creado con el
método `Joi.object()` de la biblioteca Joi. */
export const articleDataSchema = Joi.object({
    numero_articulo: Joi.string().required().min(1).max(10),
    prohibicion_articulo: Joi.string().required().min(1).max(10),
    descripcion_articulo: Joi.string().required().min(5).max(2000)
});

