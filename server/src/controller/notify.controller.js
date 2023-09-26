import { pool } from '../db.js'

export const getNotifyByUserId = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('SELECT * FROM mensajes WHERE id_usuario = ? and estado_mensaje = "Sin leer"', [id])

    res.status(200).send({ result })
  } catch (error) {
    res.status(404).send({ message: `Error al mostrar los mensajes` })
  }
}

export const changeStateMessage = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('UPDATE mensajes SET estado_mensaje = "Leido" WHERE id_mensaje = ?', [id])

    if (result.length === 0) {
      res.status(404).send({ message: `No se encontro el mensaje` })
    } else {
      res.status(200).send({ message: '' })
    }
  } catch (error) {
    res.status(404).send({ message: `Error al actualizar el estado del mensaje` })
  }
}
