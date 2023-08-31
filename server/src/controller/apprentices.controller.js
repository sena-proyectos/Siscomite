import { pool } from '../db.js'

//CONSULTAR TODOS LOS APRENDICES
/**
 * La función `getApprentices` recupera todos los aprendices de una tabla de base de datos y envía el
 * resultado como respuesta.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud. Se utiliza para recuperar datos del cliente y pasarlos al servidor.
 * @param res - El parámetro "res" es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Es una instancia del objeto de respuesta Express.
 */
export const getApprentices = async (req, res) => {
  const { idFicha } = req.query
  try {
    const [result] = await pool.query('SELECT * FROM aprendices WHERE id_ficha = ?', [idFicha])

    if (result.length === 0) return res.status(400).send({ message: 'No hay aprendices registrados en la ficha' })

    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al listar los aprendices' })
  }
}

export const searchApprenticesByGroups = async (req, res) => {
  const { idFicha, nombres } = req.query
  try {
    const [result] = await pool.query('SELECT * FROM aprendices WHERE id_ficha = ? AND CONCAT(nombres_aprendiz, " ", apellidos_aprendiz) LIKE ?', [idFicha, `%${nombres}%`])

    if (result.length === 0) return res.status(400).send({ message: 'El aprendiz no se encuentra registrado' })

    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al el aprendiz' })
  }
}

//CONSULTAR UN APRENDIZ
/**
 * La función `getApprenticeById` es una función asíncrona que recupera un aprendiz de una base de
 * datos en función de su ID y envía una respuesta con el resultado.
 */
export const getApprenticeById = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('SELECT * FROM aprendices WHERE id_aprendiz = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
    } else {
      res.status(200).send({ result })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el aprendiz' })
  }
}

//CREAR UN NUEVO APRENDIZ
/**
 * La función `createApprentices` es una función asíncrona que inserta un nuevo aprendiz en una tabla
 * de base de datos y envía una respuesta con un mensaje de éxito o un mensaje de error.
 */
export const createApprentices = async (req, res) => {
  const { nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha } = req.body
  try {
    await pool.query('INSERT INTO aprendices (nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha])
    res.status(201).send({ message: 'Aprendiz creado exitosamente' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error al crear el aprenndiz' })
  }
}

//ACTUALIZAR UN APRENDIZ
/**
 * La función `updateApprentice` actualiza la información de un aprendiz en una base de datos basada en
 * la identificación proporcionada.
 */
export const updateApprentice = async (req, res) => {
  const { id } = req.params
  const { nombres_aprendiz, apellidos_aprendiz, numero_documento_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha } = req.body
  try {
    const [result] = await pool.query('UPDATE aprendices SET nombres_aprendiz=?, apellidos_aprendiz=?, numero_documento_aprendiz=?, email_aprendiz_sena=?, email_aprendiz_personal=?, celular_aprendiz=?, id_documento=?, id_ficha=? WHERE id_aprendiz=?', [
      nombres_aprendiz,
      apellidos_aprendiz,
      numero_documento_aprendiz,
      email_aprendiz_sena,
      email_aprendiz_personal,
      celular_aprendiz,
      id_documento,
      id_ficha,
      id,
    ])
    if (result.affectedRows === 0) {
      res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
    } else {
      res.status(200).send({ message: `Aprendiz con id ${id} actualizado exitosamente` })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el aprendiz' })
  }
}

//ELIMINAR UN APRENDIZ
/**
 * La función `deleteApprentice` es una función asíncrona que elimina un aprendiz de una tabla de base
 * de datos en función de su ID.
 */
export const deleteApprentice = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('DELETE FROM aprendices WHERE id_aprendiz = ?', [id])
    if (result.affectedRows === 0) {
      res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
    } else {
      res.status(200).send({ message: `Aprendiz con id ${id} eliminado exitosamente` })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el aprendiz' })
  }
}
