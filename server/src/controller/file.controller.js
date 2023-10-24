import { pool } from '../db.js'
import multerMiddleware from '../middlewares/files.middlewares.js'
import fs from 'fs'

export const uploadFile = multerMiddleware.single('archivo')

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
  const filePath = `uploads/${nombreArchivo}`

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
