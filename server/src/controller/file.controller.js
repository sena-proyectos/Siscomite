import { pool } from '../db.js'
import fs from 'fs'

export const handleFileUpload = async (req, res) => {
  const { filename } = req.file
  const fileType = req.file.mimetype // Obtener el tipo de archivo desde Multer

  try {
    // Inserta el archivo en la tabla archivos
    const resultFile = await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo, tipo_archivo) VALUES (?, ?, ?)', [filename, `uploads/${filename}`, fileType])

    res.status(201).send({ message: 'Archivo subido y guardado exitosamente' })
  } catch (error) {
    res.status(500).send({ message: 'Error al subir y guardar el archivo' })
  }
}

/*Mostrar todos los archivos*/
export const getFiles = async (req, res) => {
  try {
    const files = await pool.query('SELECT * FROM archivos') // Obtener todos los archivos desde la base de datos

    res.status(200).send(files) // Enviar los archivos como respuesta
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los archivos' })
  }
}

// Obtener un archivo por su nombre
export const getSingleFile = async (req, res) => {
  const { nombreArchivo } = req.params
  const filePath = `C:/Archivos_SiscomiteSF/Docs/${nombreArchivo}`
  
  try {
    if (fs.existsSync(filePath)) {
      res.download(filePath)
    } else {
      res.status(404).json({ message: 'Archivo no encontrado' })
    }
  } catch (error) {
    res.status(500).send('Error interno del servidor')
  }
}

// Obtener un archivo por su nombre e id del aprendiz
export const getSingleFileByApprentice = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query(
      `SELECT DISTINCT
    detalle_solicitud_aprendices.id_aprendiz,
    detalle_solicitud_aprendices.id_solicitud AS numero_solicitud,
    usuarios.nombres,
    usuarios.apellidos,
    archivos.nombre_archivo,
    solicitud.fecha_creacion AS fecha_creacion_solicitud
    FROM detalle_solicitud_aprendices
    INNER JOIN solicitud ON detalle_solicitud_aprendices.id_solicitud = solicitud.id_solicitud
    INNER JOIN usuarios ON solicitud.id_usuario_solicitante = usuarios.id_usuario
    INNER JOIN archivos ON solicitud.id_archivo = archivos.id_archivo
    WHERE detalle_solicitud_aprendices.id_aprendiz = ?;`,
      [id]
    )

    if (!result[0]) return res.status(400).send({ message: 'El aprendiz no tiene archivos o no ha sido citado a comité de evaluación y seguimiento' })

    res.status(201).send({ result })
  } catch (error) {
    res.status(500).send('Error interno del servidor')
  }
}
