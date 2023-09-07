// Importación de módulos y recursos necesarios
import { createAprendiz } from '../schemas/apprentices.schema.js' // Importar el esquema de validación
import { pool } from '../db.js' // Importar la conexión a la base de datos
import Joi from 'joi' // Importar la librería Joi para validación de datos

// Middleware para verificar si un aprendiz ya está registrado
export const checkApprenticeExist = async (req, res, next) => {
  const { numero_documento_aprendiz } = req.body

  try {
    // Consulta SQL para verificar si ya existe un aprendiz con el número de documento proporcionado
    const [apprenticeExist] = await pool.query('SELECT * FROM aprendices WHERE numero_documento_aprendiz = ?', [numero_documento_aprendiz])

    // Si se encuentra un aprendiz con el mismo número de documento, se envía una respuesta de conflicto (409)
    if (apprenticeExist.length > 0) {
      return res.status(409).json({ message: 'El Aprendiz ya está registrado' })
    }

    // Si no se encuentra ningún aprendiz con el mismo número de documento, se continúa con la siguiente middleware
    next()
  } catch (error) {
    // En caso de error, se envía una respuesta de error interno del servidor (500)
    return res.status(500).json({ message: 'Error al verificar el aprendiz' })
  }
}

// Middleware para validar y crear datos de un aprendiz
export const createDataAprendiz = (req, res, next) => {
  // Extracción de datos del cuerpo de la solicitud
  const { nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha } = req.body

  try {
    // Validación de los datos del aprendiz utilizando el esquema de validación 'createAprendiz'
    const { error } = createAprendiz.validate({ nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, celular_aprendiz, id_documento, id_ficha })

    // Si se encuentra un error de validación, se envía una respuesta de error de cliente (400)
    if (error !== undefined) {
      return res.status(400).json({ message: 'Los datos del aprendiz no son válidos, verifícalos.' })
    }

    // Si los datos del aprendiz son válidos, se continúa con la siguiente middleware
    next()
  } catch (error) {
    // En caso de error inesperado, se envía una respuesta de error interno del servidor (500)
    return res.status(500).json({ message: 'Error inesperado' })
  }
}

// Middleware para validar el nombre proporcionado en la consulta
export const checkName = (req, res, next) => {
  const { nombres } = req.query

  // Definir el esquema de validación para el nombre
  const nameSchema = Joi.object({ nombres: Joi.string().required().max(100) })

  try {
    // Validar el nombre utilizando el esquema definido
    const { error } = nameSchema.validate({ nombres })

    // Si se encuentra un error de validación, se envía una respuesta de error de cliente (400)
    if (error !== undefined) {
      return res.status(400).send({ message: 'El nombre ingresado no es válido.' })
    }

    // Si el nombre es válido, se continúa con la siguiente middleware
    next()
  } catch (error) {
    // En caso de error inesperado, se envía una respuesta de error interno del servidor (500)
    return res.status(500).json({ message: 'Error inesperado' })
  }
}
