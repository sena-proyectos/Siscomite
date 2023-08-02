import { pool } from '../db.js'
import { registerDataSchema, loginDataSchema } from '../schemas/user.schemas.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
// import Joi from 'joi'

export const checkUserExistRegister = async (req, res, next) => {
    const {  num_documento } = req.body

    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])

        if (userExist.length > 0) {
            return res.status(409).send({ message: 'El usuario ya está registrado' })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Error al verificar el usuario' })
    }
}
export const checkUserExistLogin= async (req, res, next) => {
    const {  num_documento } = req.body

    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
        if (!userExist[0]) {
            return res.status(409).send({ message: 'El usuario NO está registrado' })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Error al verificar el usuario' })
    }
}

export const checkRegisterData = (req, res, next) => {
    const { nombre, apellido, correo_institucional, num_telefono, tipo_documento, num_documento, contrasena } = req.body
    const idNumberParsed = Number(num_documento)

    try {
        if (isNaN(idNumberParsed)) res.status(400).send({ message: 'El número de documento no es un número válido.' })
        const { error } = registerDataSchema.validate({ nombre, apellido, correo_institucional, num_telefono, tipo_documento, num_documento, contrasena })
        if (error !== undefined) return res.status(400).send({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        res.status(500).json({ message: 'Error inesperado' })
    }
}

export const checkLoginData = (req, res, next) => {
    const { num_documento, contrasena } = req.body

    const idNumberParsed = Number(num_documento)

    try {
        if (isNaN(idNumberParsed)) res.status(400).send({ message: 'El número de documento no es un número válido.' })
        const { error } = loginDataSchema.validate({ num_documento, contrasena })
        if (error !== undefined) return res.status(200).send({ message: 'Los datos ingresados no son válidos, verifícalos.' })

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
    const { num_documento, contrasena } = req.body
    try {
        const [userExist] = await pool.query('SELECT contrasena FROM usuarios WHERE num_documento = ?', num_documento)

        const passwordCompare = await bcrypt.compare(contrasena, userExist[0].contrasena)
        if (!passwordCompare) {
            return res.status(401).send({ message: 'Contraseña incorrecta' })
        }
        next()
    } catch (error) {}
}

export const createToken = async (req, res, next) => {
    const { num_documento } = req.body
    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
        if (!userExist[0]) return res.status(500).send({ message: 'El usuario no se encuentra registrado' })

        const payload = {
            id_usuarios: userExist[0].id_usuarios,
            nombre: userExist[0].nombre,
            apellido: userExist[0].apellido,
            correo_institucional: userExist[0].correo_institucional,
            correo_personal: userExist[0].correo_personal,
            num_telefono: userExist[0].num_telefono,
            num_fijo: userExist[0].num_fijo,
            tipo_documento: userExist[0].tipo_documento,
            num_documento: userExist[0].num_documento,
        }
        const token = jwt.sign(payload, 'secret-keY', { expiresIn: 2 })
        res.locals.token = token
        next()
    } catch (error) {
        res.status(500).send({ message: 'Error al generar el token' })
    }
}
