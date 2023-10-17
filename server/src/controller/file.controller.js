import { pool } from '../db.js'
import multerMiddleware from '../middlewares/files.middlewares.js'
import { minioClient } from '../config.js'

export const uploadFile = multerMiddleware.single('archivo')

export const handleFileUpload = async (req, res) => {
  const { filename, mimetype } = req.file
  const bucketName = 'uploads'
  const objectName = `${filename}`
  const serverUrl = 'http://localhost:9000'

  const url = `${serverUrl}/${bucketName}/${objectName}`

  try {
    // Inserta la URL del objeto de MinIO en la base de datos
    await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo, tipo_archivo) VALUES (?, ?, ?)', [filename, url, mimetype])

    // Si la inserción en la base de datos es exitosa, entonces sube el archivo a MinIO
    await minioClient.fPutObject(bucketName, objectName, req.file.path, {
      'Content-Type': mimetype
    })

    res.status(201).send({ message: 'Archivo subido y guardado exitosamente' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error al subir y guardar el archivo' })
  }
}

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

  try {
    const file = await minioClient.getObject('uploads', nombreArchivo)

    res.setHeader('Content-Type', file.type)
    res.send(file.read())
  } catch (error) {
    res.status(500).send('Error interno del servidor')
  }
}
