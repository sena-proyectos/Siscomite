import Joi from 'joi'

/* Datos del cuerpo de la solicitud que son requeridos */
export const ruleDataSchema = Joi.object({
  titulo: Joi.string().required().min(1).max(300),
  descripcion_capitulo: Joi.string().required().min(1).max(300),
  numero_articulo: Joi.string().required().min(1).max(300),
  descripcion_articulo: Joi.string().required().min(1).max(300),
  numero_numeral: Joi.string().required().min(1).max(300),
  descripcion_numeral: Joi.string().required().min(1).max(300),
  titulo_paragrafo: Joi.string().required().min(1).max(300),
  descripcion_paragrafo: Joi.string().required().min(1).max(300)
})
