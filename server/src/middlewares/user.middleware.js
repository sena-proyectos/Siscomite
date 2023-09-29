// Importar la conexión a la base de datos desde pool
import { pool } from '../db.js'
// Importar esquemas de validación y herramientas de seguridad
import { registerDataSchema, loginDataSchema } from '../schemas/user.schemas.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Joi from 'joi'

// Middleware para verificar si un usuario ya está registrado al intentar registrarse
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

// Middleware para verificar si un usuario existe al intentar iniciar sesión
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

// Middleware para validar los datos al registrar un usuario
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

// Middleware para validar los datos al iniciar sesión
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

// Middleware para hashear la contraseña antes de almacenarla
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

// Middleware para comparar contraseñas al iniciar sesión
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

/* validar si el usuario esta activo */
export const validateUser = async (req, res, next) => {
  const { numero_documento } = req.body
  try {
    const [validate] = await pool.query('SELECT estado FROM usuarios WHERE numero_documento = ?', numero_documento)
    if (validate[0].estado === 'INACTIVO') return res.status(401).json({ message: 'No se puede iniciar sesión, su estado es inactivo, comuniquese con el administrador para volver a activar su cuenta' })

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
  }
}

// Middleware para generar un token JWT después de iniciar sesión
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
      email_personal: userExist[0].email_personal,
      numero_celular: userExist[0].numero_celular,
      telefono_fijo: userExist[0].telefono_fijo,
      id_documento: userExist[0].id_documento,
      id_rol: userExist[0].id_rol,
      numero_documento: userExist[0].numero_documento
    }
    const token = jwt.sign(payload, 'secret-keY', { expiresIn: 2 })
    res.locals.token = token
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error al generar el token' })
  }
}

// Middleware para validar el nombre
export const checkName = (req, res, next) => {
  const { nombres } = req.query
  const nameSchema = Joi.object({ nombres: Joi.string().required().min(0).max(100) })
  try {
    const { error } = nameSchema.validate({ nombres })
    if (error !== undefined) return res.status(400).send({ message: 'El nombre completo ingresado no es válido.' })
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
  }
}

// Middleware para actualizar contraseña
export const updatePassword = async (req, res, next) => {
  const { id } = req.params
  const { contrasena } = req.body

  if (contrasena) {
    try {
      const [userExist] = await pool.query('SELECT contrasena FROM usuarios WHERE id_usuario = ?', [id])

      const passwordCompare = await bcrypt.compare(contrasena, userExist[0].contrasena)

      if (!passwordCompare) {
        return res.status(401).json({ message: 'La contraseña debe ser igual a su antigua contraseña' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error inesperado', error })
    }
  }

  next()
}

// Middleware para hashear la contraseña al actualizarlo
export const hashPasswordUpdate = async (req, res, next) => {
  const { nuevaContrasena } = req.body

  if (nuevaContrasena) {
    try {
      const passwordHash = await bcrypt.hash(nuevaContrasena, 10)
      req.hashedPassword = passwordHash
    } catch (error) {
      return res.status(500).json({ message: 'Error inesperado' })
    }
  }
  next()
}
