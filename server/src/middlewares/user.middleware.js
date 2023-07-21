import { pool } from '../db.js'
import { registerDataSchema } from '../schemas/user.schemas.js'
import bcrypt from 'bcryptjs'
import Joi from 'joi'

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

export const checkRegisterData = (req, res, next) => {
    const { nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena } = req.body

    const idNumberParsed = Number(num_documento)

    try {
        if (isNaN(idNumberParsed)) res.status(400).send({ message: 'El número de documento no es un número válido.' })
        const { error } = registerDataSchema.validate({ nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena })
        if (error !== undefined) return res.send({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        res.status(500).json({ message: 'Error inesperado' })
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

export const comparePassword = async (req, res, next) => {
    const { contrasena } = req.body

    try {
        const passwordCompare = bcrypt.compare(contrasena)
        req.body.contrasena = passwordCompare
        next()
    } catch (error) {
        res.status(500).send({ message: 'Error inesperado' })
    }
}
