// Importar el esquema de validación createDocumento
import { createDocumento } from '../schemas/documents.schemas.js'

// Middleware para verificar y validar los datos de un documento
export const createDataDocuments = (req, res, next) => {
  // Extraer el tipo de documento del cuerpo de la solicitud
  const { tipo_documento } = req.body

  try {
    // Validar el tipo de documento utilizando el esquema de validación 'createDocumento'
    const { error } = createDocumento.validate({ tipo_documento })

    // Comprobar si hay un error de validación
    if (error !== undefined) {
      return res.status(400).json({ message: 'Los datos del documento no son válidos, verifícalos.' })
    }

    // Si los datos del documento son válidos, se permite que la solicitud continúe al siguiente middleware o controlador
    next()
  } catch (error) {
    // En caso de error, se envía una respuesta de error interno del servidor (500) con un mensaje genérico de error
    return res.status(500).json({ message: 'Error inesperado' })
  }
}
