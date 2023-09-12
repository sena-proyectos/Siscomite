import { pool } from '../db.js';
import multerMiddleware from '../middlewares/files.middlewares.js';
import path from 'path';
import fs from 'fs';

export const uploadFile = multerMiddleware.single('archivo');

export const handleFileUpload = async (req, res) => {
  // Verifica si ocurrió un error durante la carga del archivo
  if (req.fileValidationError) {
    return res.status(400).send({ message: 'Tipo de archivo no permitido' });
  }

  const { filename } = req.file;
  const fileType = req.file.mimetype; // Obtener el tipo de archivo desde Multer

  try {
    await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo, tipo_archivo) VALUES (?, ?, ?)', [filename, `uploads/${filename}`, fileType]);
    res.status(201).send({ message: 'Archivo subido y guardado exitosamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al subir y guardar el archivo' });
  }
};



export const getFiles = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM archivos'); // Obtener todos los archivos desde la base de datos

    // Transformar los resultados en el formato esperado
    const files = queryResult.map((row) => {
      return {
        nombre_archivo: row.nombre_archivo, 
      };
    });

    res.status(200).send(files); // Enviar los archivos como respuesta
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los archivos' });
  }
};



// Obtener un archivo por su nombre
export const getSingleFile = async (req, res) => {
  const { nombreArchivo } = req.params;
  const currentFileUrl = import.meta.url;
  const currentDir = path.dirname(new URL(currentFileUrl).pathname);
  const rutaArchivo = path.join(currentDir, 'uploads/', nombreArchivo);

  try {
    // Verifica si el archivo existe antes de enviarlo
    if (fs.existsSync(rutaArchivo)) {
      // Devuelve la URL del archivo en lugar de enviar el archivo directamente
      res.json({ archivoUrl: `/api/obtenerArchivo/${nombreArchivo}` });
    } else {
      // Si el archivo no existe, envía un mensaje de error 404
      res.status(404).send('Archivo no encontrado: ' + nombreArchivo);
    }
  } catch (error) {
    // Si ocurre cualquier excepción durante la verificación o el envío del archivo
    res.status(500).send('Error interno del servidor');
  }
};
