import { pool } from '../db.js'
import { registerDataSchema, loginDataSchema } from '../schemas/user.schemas.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const checkUserExistRegister = async (req, res, next) => {
    const { numero_documento } = req.body

    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE numero_documento = ?', [numero_documento])

        if (userExist.length > 0) {
            return res.status(409).json({ message: 'El usuario ya está registrado' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar el usuario' })
        
    }
}

export const checkUserExistLogin = async (req, res, next) => {
    const { numero_documento } = req.body

    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE numero_documento = ?', [numero_documento])
        if (!userExist[0]) {
            return res.status(409).json({ message: 'El usuario NO está registrado' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar el usuario' })
    }
}

export const checkRegisterData = (req, res, next) => {
    const { nombres, apellidos, email_sena, numero_celular, numero_documento, contrasena } = req.body
    const idNumberParsed = Number(numero_documento)

    try {
        if (isNaN(idNumberParsed)) return res.status(400).json({ message: 'El número de documento no es un número válido.' })
        const { error } = registerDataSchema.validate({ nombres, apellidos, email_sena, numero_celular, numero_documento, contrasena })
        if (error !== undefined) return res.status(400).json({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error inesperado' })
    }
}

export const checkLoginData = (req, res, next) => {
    const { numero_documento, contrasena } = req.body

    const idNumberParsed = Number(numero_documento)

    try {
        if (isNaN(idNumberParsed)) return res.status(400).json({ message: 'El número de documento no es un número válido.' })
        const { error } = loginDataSchema.validate({ numero_documento, contrasena })
        if (error !== undefined) return res.status(400).json({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error inesperado' })
    }
}

export const hashPassword = async (req, res, next) => {
    const { contrasena } = req.body

    try {
        const passwordHash = await bcrypt.hash(contrasena, 10)
        req.body.contrasena = passwordHash
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error inesperado' })
    }
}

export const comparePassword = async (req, res, next) => {
    const { numero_documento, contrasena } = req.body
    try {
        const [userExist] = await pool.query('SELECT contrasena FROM usuarios WHERE numero_documento = ?', numero_documento)

        const passwordCompare = await bcrypt.compare(contrasena, userExist[0].contrasena)
        if (!passwordCompare) {
            return res.status(401).json({ message: 'Contraseña incorrecta' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error inesperado' })
    }
}

export const createToken = async (req, res, next) => {
    const { numero_documento } = req.body
    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE numero_documento = ?', [numero_documento])
        if (!userExist[0]) return res.status(500).json({ message: 'El usuario no se encuentra registrado' })

        const payload = {
            id_usuario: userExist[0].id_usuario,
            nombres: userExist[0].nombres,
            apellidos: userExist[0].apellidos,
            email_sena: userExist[0].email_sena,
            numero_celular: userExist[0].numero_celular,
            id_documento : userExist[0].id_documento,
            numero_documento: userExist[0].numero_documento,
        }
        const token = jwt.sign(payload, 'secret-keY', { expiresIn: 2 })
        res.locals.token = token
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error al generar el token' })
    }
}
