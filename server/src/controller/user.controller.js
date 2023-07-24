import { pool } from '../db.js'

export const getUser = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los usuarios' })
    }
}

export const regiserUser = async (req, res) => {
    const { nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena } = req.body

    try {
        await pool.query('INSERT INTO usuarios (nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena, id_roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 2)', [nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena])
        res.status(201).send({ message: 'Usuario creado exitosamente' })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el usuario' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const token = res.locals.token

        const response = {
            success: true,
            info: {
                message: 'Inicio de sesión exitoso',
                token: token,
            },
        }

        res.status(200).json({response})
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido iniciar sesión' })
    }
}
