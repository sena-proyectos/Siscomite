import Joi from "joi";

export const createSolicitud = Joi.object({
    tipo_solicitud: Joi.string().required().min(2).max(100),
    nombre_coordinacion: Joi.string().required().min(2).max(100),
    id_causa: Joi.int().required().min(5).max(15),
    id_usuario_solicitante: Joi.int().required().min(5).max(15),
    id_usuario_receptor: Joi.int().required().min(5).max(15),
    id_aprendiz: Joi.int().required().min(5).max(15)
})
