import Joi from "joi";

export const createSolicitud = Joi.object({
    tipo_solicitud: Joi.string().required().min(2).max(100),
    nombre_coordinacion: Joi.string().required().min(2).max(100),
    id_usuario_solicitante: Joi.string().required().max(15),
    id_aprendiz: Joi.string().required().max(15),
    categoria_causa: Joi.string().required().max(100),
    calificacion_causa: Joi.string().required().max(100),
    descripcion_caso: Joi.string().required().max(2000),
    id_archivo: Joi.string().required().max(1000),
});

