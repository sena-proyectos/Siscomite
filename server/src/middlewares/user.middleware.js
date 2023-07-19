import { pool } from '../db.js'

export const checkUserExist = async (req, res, next) => {
  const { correo_institucional, num_documento } = req.body

  try {
    const [userExist] = await pool.query('SELECT * FROM usuarios WHERE correo_institucional = ? OR num_documento = ?', [correo_institucional, num_documento])

    if (userExist.length > 0) {
      return res.status(409).send({ message: 'El usuario ya está registrado' })
    }

    next()
  } catch (error) {
    res.status(500).send({ message: 'Error al verificar el usuario' })
  }
}
