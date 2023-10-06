import { pool } from '../db.js'

export const getTemplates = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM plantillas')
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las plantillas' })
  }
}

export const getTemplateById = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('SELECT * FROM plantillas WHERE id_plantilla = ? ', id)

    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las plantillas' })
  }
}
