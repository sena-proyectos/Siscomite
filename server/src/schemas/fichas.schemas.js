import Joi from 'joi'

export const createFicha = Joi.object({
  numero_ficha: Joi.string().required().min(2).max(12),
  nombre_programa: Joi.string().required().min(2).max(100),
  jornada: Joi.string().required().min(5).max(60),
  etapa_programa: Joi.string().required().min(5).max(35),
  numero_trimestre: Joi.string().required().min(0).max(20),
})
