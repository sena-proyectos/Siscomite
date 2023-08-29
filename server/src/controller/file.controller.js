import { pool } from '../db.js';
import multerMiddleware from '../middlewares/files.middlewares.js';

export const uploadFile = multerMiddleware.single('archivo');

export const handleFileUpload = async (req, res) => {
  // En req.file tienes la información sobre el archivo subido
  // Puedes acceder a req.file.filename para obtener el nombre del archivo
  const { filename } = req.file;

  // Puedes hacer lo que necesites con el nombre del archivo, como guardarlo en la base de datos
  try {
    await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo) VALUES (?, ?)', [filename, `uploads/${filename}`]);
    res.status(201).send({ message: 'Archivo subido y guardado exitosamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al subir y guardar el archivo' });
  }
};
