import { pool } from '../db.js'
import bcrypt from 'bcryptjs'

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM usuarios')
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Error al listar los usuarios' })
  }
}

export const regiserUser = async (req, res) => {
  const { nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena } = req.body

  const passwordHash = await bcrypt.hash(contrasena, 10)

  try {
    await pool.query('INSERT INTO usuarios (nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, contrasena, id_roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 2)', [nombre, apellido, correo_institucional, correo_personal, num_telefono, num_fijo, tipo_documento, num_documento, passwordHash])
    res.status(200).send({ message: 'Usuario creado exitosamente' })
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el usuario' })
  }
}
