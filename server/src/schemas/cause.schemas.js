import Joi from 'joi'

/* El código define un esquema utilizando la biblioteca Joi para validar un objeto llamado
`causeDataSchema`. Este esquema especifica las reglas de validación para cada propiedad del objeto. */
export const causeDataSchema = Joi.object({
    categoria_causa: Joi.string().required().min(1).max(100),
    calificacion_causa: Joi.string().required().min(1).max(10),
    descripcion_caso: Joi.string().required().min(5).max(2000),
    evidencias: Joi.string().required().max(1000),
    id_articulo: Joi.string().required().max(10)
});
