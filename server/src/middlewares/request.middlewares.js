// Importar el esquema de validación createSolicitud
import { createSolicitud } from '../schemas/request.schemas.js'

// Middleware para verificar y validar los datos de una solicitud antes de crearla
export const createDataSolicitud = (req, res, next) => {
  // Extraer los datos de la solicitud del cuerpo de la solicitud
  const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, categoria_causa, calificacion_causa, descripcion_caso } = req.body

  // Convertir los ID a números enteros
  //const idParsedUser = Number(id_usuario_solicitante)
  //const idParsedArchivo = Number(id_archivo)

  try {
    // Comprobar si los ID son números válidos
    //if (isNaN(idParsedUser)) return res.status(400).json({ message: 'El usuario no es válido.' })
   /*  if (isNaN(idParsedArchivo)) return res.status(400).json({ message: 'El archivo no es válido.' }) */

    // Validar los datos de la solicitud utilizando el esquema de validación 'createSolicitud'
    const { error } = createSolicitud.validate({ tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, categoria_causa, calificacion_causa, descripcion_caso })
    // Comprobar si hay un error de validación
    if (error !== undefined) {
      return res.status(400).json({ message: 'Los datos de la solicitud no son válidos, verifícalos.' })
    }

    // Si los datos de la solicitud son válidos, se permite que la solicitud continúe al siguiente middleware o controlador
    next()
  } catch (error) {
    // En caso de error, se envía una respuesta de error interno del servidor (500) con un mensaje genérico de error
    return res.status(500).json({ message: 'Error inesperado' })
  }
}
