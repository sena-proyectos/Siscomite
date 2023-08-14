import { pool } from '../db.js'

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM usuarios')
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al listar los usuarios' })
  }
}

export const getTeacher = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_roles = 2')
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al listar los instructores' })
  }
}

export const registerUser = async (req, res) => {
  const { nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena } = req.body
  try {
    await pool.query('INSERT INTO usuarios (nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, 2)', [nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena])
    return res.status(201).json({ message: 'Usuario creado exitosamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario' })
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

    res.status(200).json({ response })
  } catch (error) {
    res.status(500).send({ message: 'No se ha podido iniciar sesión' })
  }
}

export const searchUser = async (req, res) => {
  const { nombres } = req.query

  try {
    const [user] = await pool.query('SELECT * FROM aprendices WHERE CONCAT(nombres, " ", apellidos) LIKE ?', [`%${nombres}%`])
    if (user.length === 0) return res.status(401).send({ message: 'No se encontró al aprendiz' })
    res.status(200).send({ user })
  } catch (error) {
    res.status(401).send({ message: 'ah ocurrido un error inesperado' })
  }
}

export const searchTeacher = async (req, res) => {
  const { nombres } = req.query

  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE CONCAT(nombres, " ", apellidos) LIKE ?', [`%${nombres}%`])
    if (user.length === 0) return res.status(401).send({ message: 'No se encontró ningún instructor' })
    res.status(200).send({ user })
  } catch (error) {
    res.status(401).send({ message: 'ah ocurrido un error inesperado' })
  }
}
