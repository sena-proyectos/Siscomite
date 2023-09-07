// Importar el esquema de validación createFicha
import { createFicha } from '../schemas/fichas.schemas.js'

// Importar la conexión a la base de datos desde pool
import { pool } from '../db.js'

// Middleware para verificar y validar los datos de una ficha antes de crearla
export const createDataFicha = (req, res, next) => {
  // Extraer los datos de la ficha del cuerpo de la solicitud
  const { numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre } = req.body

  try {
    // Validar los datos de la ficha utilizando el esquema de validación 'createFicha'
    const { error } = createFicha.validate({ numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre })

    // Comprobar si hay un error de validación
    if (error !== undefined) {
      return res.status(400).json({ message: 'Los datos de la ficha no son válidos, verifícalos.' })
    }

    // Si los datos de la ficha son válidos, se permite que la solicitud continúe al siguiente middleware o controlador
    next()
  } catch (error) {
    // En caso de error, se envía una respuesta de error interno del servidor (500) con un mensaje genérico de error
    return res.status(500).json({ message: 'Error inesperado' })
  }
}

// Middleware para verificar si una ficha ya existe antes de crearla
export const checkFichaExist = async (req, res, next) => {
  // Extraer el número de ficha del cuerpo de la solicitud
  const { numero_ficha } = req.body

  try {
    // Consultar la base de datos para verificar si la ficha ya existe
    const [fichaExist] = await pool.query('SELECT * FROM fichas WHERE numero_ficha = ?', [numero_ficha])

    // Comprobar si ya existe una ficha con el mismo número
    if (fichaExist.length > 0) {
      return res.status(409).send({ message: 'La ficha que intentas registrar ya existe' })
    }

    // Si la ficha no existe, se permite que la solicitud continúe al siguiente middleware o controlador
    next()
  } catch (error) {
    // En caso de error al verificar la ficha, se envía una respuesta de error interno del servidor (500)
    return res.status(500).json({ message: 'Error al verificar la ficha' })
  }
}
