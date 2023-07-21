import { pool } from '../db.js'
import bcrypt from 'bcryptjs'

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

export const hashPassword = async (req, res, next) => {
    const { contrasena } = req.body

    try {
        const passwordHash = await bcrypt.hash(contrasena, 10)
        req.body.contrasena = passwordHash
        next()
    } catch (error) {
        res.status(500).send({ message: 'Error inesperado' })
    }
}
