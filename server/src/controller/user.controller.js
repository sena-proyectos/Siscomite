// Importación del módulo 'pool' desde '../db.js'
import { pool } from '../db.js'

// Controlador para obtener todos los usuarios
export const getUser = async (req, res) => {
  try {
    // Consulta SQL para seleccionar todos los usuarios
    const [result] = await pool.query('SELECT * FROM usuarios')

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ result })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(500).send({ message: 'Error al listar los usuarios' })
  }
}

/* controlador para obtener instructores por ID */
export const userById = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ? and id_rol = 2', [id])
    if (result.length === 0) {
      res.status(404).send({ message: `No se encontró al instructor` })
    } else {
      res.status(200).send({ result })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el instructor' })
  }
}

/* controlador para obtener usuarios por ID */
export const usersById = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ message: `No se encontró al usuario` })
    } else {
      res.status(200).send({ result })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el usuario' })
  }
}

// Controlador para obtener todos los instructores
export const getTeacher = async (req, res) => {
  try {
    // Consulta SQL para seleccionar usuarios con un id de rol igual a 2 (instructor)
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2')

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ result })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(500).send({ message: 'Error al listar los instructores' })
  }
}

// Controlador para obtener todos los coordinadores
export const getCoordination = async (req, res) => {
  try {
    // Consulta SQL para seleccionar usuarios con un id de rol igual a 1 (coordinador)
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 1')

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ result })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(500).send({ message: 'Error al listar los coordinadores' })
  }
}

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena } = req.body

  try {
    // Consulta SQL para insertar un nuevo usuario en la base de datos
    await pool.query('INSERT INTO usuarios (nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena, estado, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, "ACTIVO", 2)', [nombres, apellidos, email_sena, numero_celular, id_documento, numero_documento, contrasena])

    // Enviar una respuesta exitosa
    return res.status(201).json({ message: 'Usuario creado exitosamente' })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    return res.status(500).json({ message: 'Error al crear el usuario' })
  }
}

// Controlador para iniciar sesión de usuario
export const loginUser = async (req, res) => {
  try {
    // Obtener el token del middleware y preparar una respuesta exitosa
    const token = res.locals.token
    const response = {
      success: true,
      info: {
        message: 'Inicio de sesión exitoso',
        token: token
      }
    }

    // Enviar una respuesta exitosa con el token
    res.status(200).json({ response })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(500).send({ message: 'No se ha podido iniciar sesión' })
  }
}

// Controlador para buscar un aprendiz por nombre
export const searchUser = async (req, res) => {
  // Extraer el nombre a buscar desde la consulta
  const { nombres } = req.query

  try {
    // Consulta SQL para buscar aprendices por nombre (usando LIKE para búsqueda parcial)
    const [user] = await pool.query('SELECT * FROM aprendices WHERE CONCAT(nombres_aprendiz, " ", apellidos_aprendiz) LIKE ?', [`%${nombres}%`])

    // Verificar si se encontraron resultados
    if (user.length === 0) return res.status(400).send({ message: 'No se encontró al aprendiz' })

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ user })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(401).send({ message: 'Ha ocurrido un error inesperado' })
  }
}

// Controlador para buscar un instructor por nombre
export const searchTeacher = async (req, res) => {
  // Extraer el nombre a buscar desde la consulta
  const { nombres } = req.query

  try {
    // Consulta SQL para buscar instructores por nombre (usando LIKE para búsqueda parcial)
    const [user] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2 AND CONCAT(nombres, " ", apellidos) LIKE ?', [`%${nombres}%`])

    // Verificar si se encontraron resultados
    if (user.length === 0) return res.status(400).send({ message: 'No se encontró ningún instructor' })

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ user })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(401).send({ message: 'Ha ocurrido un error inesperado' })
  }
}

// Controlador para buscar un coordinador por nombre
export const searchCoordination = async (req, res) => {
  // Extraer el nombre a buscar desde la consulta
  const { nombres } = req.query

  try {
    // Consulta SQL para buscar coordinadores por nombre (usando LIKE para búsqueda parcial)
    const [user] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 1 AND CONCAT(nombres, " ", apellidos) LIKE ?', [`%${nombres}%`])

    // Verificar si se encontraron resultados
    if (user.length === 0) return res.status(400).send({ message: 'No se encontró ningún coordinador' })

    // Enviar una respuesta exitosa con los resultados
    res.status(200).send({ user })
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(401).send({ message: 'Ha ocurrido un error inesperado' })
  }
}

// Controlador para actualizar los datos de los usuarios
export const updateUserById = async (req, res) => {
  const { email_sena, email_personal, numero_celular, telefono_fijo } = req.body
  const { id } = req.params
  const hashedPassword = req.hashedPassword
  try {
    const [result] = await pool.query('UPDATE usuarios SET email_sena = IFNULL(?, email_sena), email_personal = IFNULL(?, email_personal), numero_celular = IFNULL(?, numero_celular), telefono_fijo = IFNULL(?, telefono_fijo), contrasena = IFNULL(?, contrasena) WHERE id_usuario = ? ', [email_sena, email_personal, numero_celular, telefono_fijo, hashedPassword, id])

    if (result.length === 0) {
      res.status(404).send({ message: `No se encontró al usuario` })
    } else {
      res.status(200).send({ message: 'Datos actualizados correctamente' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el usuario' })
  }
}

/* Cambiar el estado de la cuenta */
export const changeStateAccount = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('UPDATE usuarios SET estado = "INACTIVO" WHERE id_usuario = ?', [id])

    if (result.length === 0) {
      res.status(404).send({ message: `No se encontró al usuario` })
    } else {
      res.status(200).send({ message: 'Cuenta deshabilitada correctamente, serás redireccionado a la página de inicio' })
    }
  } catch (error) {
    
    res.status(500).send({ message: 'Error al deshabilitar el usuario' })
  }
}
