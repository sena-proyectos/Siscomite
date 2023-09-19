import { pool } from '../db.js';
import multerMiddleware from '../middlewares/files.middlewares.js';
import path from 'path';
import fs from 'fs';
/*Subir un archivo*/
export const uploadFile = multerMiddleware.single('archivo');

export const handleFileUpload = async (req, res) => {
  // Verifica si ocurrió un error durante la carga del archivo
  if (req.fileValidationError) {
    return res.status(400).send({ message: 'Tipo de archivo no permitido' });
  }

  const { filename } = req.file;
  console.log(filename);
  const fileType = req.file.mimetype; // Obtener el tipo de archivo desde Multer

  try {
    await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo, tipo_archivo) VALUES (?, ?, ?)', [filename, `uploads/${filename}`, fileType]);
    res.status(201).send({ message: 'Archivo subido y guardado exitosamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al subir y guardar el archivo' });
  }
};



/*Mostrar todos los archivos*/
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



/*Mostrar un archivo por su id*/
export const serveFileById = async (req, res) => {
  const fileId = req.params.fileId; // Obtener el ID del archivo desde la URL

  try {
    // Buscar el archivo en la base de datos por su ID
    const result = await pool.query('SELECT * FROM archivos WHERE id = ?', [fileId]);

    if (result.length === 0) {
      return res.status(404).send({ message: 'Archivo no encontrado' });
    }

    const archivo = result[0];
    const filePath = archivo.ruta_archivo; // Obtener la ruta del archivo

    // Leer el archivo del sistema de archivos y enviarlo como respuesta
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el archivo' });
  }
};



