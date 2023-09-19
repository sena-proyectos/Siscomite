import { pool } from '../db.js'

export const getNotifyByUserId = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('SELECT * FROM mensajes WHERE id_usuario = ?', [id])

    if (result.length === 0) {
      res.status(404).send({ message: `No hay mensajes registrados` })
    } else {
      res.status(200).send({ result })
    }
  } catch (error) {
    res.status(404).send({ message: `Error al mostrar los mensajes` })
  }
}
