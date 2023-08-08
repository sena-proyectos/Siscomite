import { createFicha } from '../schemas/fichas.schemas.js'
import { pool } from '../db.js'


export const createDataFicha = (req, res, next) => {
  const { numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre } = req.body
  try {
    const { error } = createFicha.validate({ numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos de la ficha no son válidos, verifícalos.' })
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
  }
}

export const checkFichaExist = async (req, res, next) => {
  const { numero_ficha } = req.body
  try {
    const [fichaExist] = await pool.query('SELECT * FROM fichas WHERE numero_ficha = ?', [numero_ficha])

    if (fichaExist.length > 0) {
      return res.status(409).send({ message: 'La ficha que intentas registrar ya existe' })
    } 

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar la ficha' })
  }
}
