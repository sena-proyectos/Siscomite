// Importar el esquema de validación articleDataSchema
import { articleDataSchema } from '../schemas/article.schema.js'

// Middleware para verificar y validar los datos de un artículo
export const checkArticleData = (req, res, next) => {
  // Extracción de datos del cuerpo de la solicitud
  const { numero_articulo, prohibicion_articulo, descripcion_articulo } = req.body

  // Convertir el número de artículo a un valor numérico
  const idNumberParsed = Number(numero_articulo)

  try {
    // Comprobar si el número de artículo es un número válido
    if (isNaN(idNumberParsed)) {
      return res.status(400).send({ message: 'El número de artículo no es un número válido.' })
    }

    // Validar los datos del artículo utilizando el esquema de validación 'articleDataSchema'
    const { error } = articleDataSchema.validate({ numero_articulo, prohibicion_articulo, descripcion_articulo })

    // Si se encuentra un error de validación, se envía una respuesta de error de cliente (400)
    if (error !== undefined) {
      return res.send({ message: 'Los datos ingresados no son válidos.' })
    }

    // Si los datos del artículo son válidos, se permite que la solicitud continúe al siguiente middleware o controlador
    next()
  } catch (error) {
    // En caso de error inesperado, se envía una respuesta de error interno del servidor (500)
    res.status(500).json({ message: 'Error inesperado' })
  }
}
