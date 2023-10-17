import { Router } from "express";
import multerMiddleware from '../middlewares/files.middlewares.js';
import { getFiles, getSingleFile, handleFileUpload } from "../controller/file.controller.js";

const router = Router();

// Obtener archivos
router.get('/archivos', getFiles);

// Obtener un archivo por su nombre
router.get('/obtenerArchivo/:nombreArchivo', getSingleFile);

// Subir archivo
router.post('/subir-archivo', multerMiddleware.single('archivo'), handleFileUpload);

export default router;
