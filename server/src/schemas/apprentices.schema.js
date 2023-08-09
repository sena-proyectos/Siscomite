import Joi from "joi";

/* El código define un esquema de validación utilizando la biblioteca Joi en JavaScript. */
export const createAprendiz = Joi.object({
    nombres_aprendiz: Joi.string().required().min(2).max(100),
    apellidos_aprendiz: Joi.string().required().min(2).max(100),
    email_aprendiz_sena: Joi.string().email().required().min(5).max(100),
    email_aprendiz_personal: Joi.string().email().required().min(5).max(100),
    celular_aprendiz: Joi.string().required().min(5).max(15),
    id_documento: Joi.int().required().min(5).max(15),
    id_ficha: Joi.int().required().min(5).max(15)
})
