import { Router } from "express";
import multerMiddleware from '../middlewares/files.middlewares.js';
import { handleFileUpload, uploadFile, getFiles } from "../controller/file.controller.js";



const router = Router();

// Obtener archivos
router.get('/archivos', getFiles);
// Obtener un archivo por su nombre
//router.get('/obtenerArchivo/:nombreArchivo', getSingleFile);
// Subir archivo
router.post('/subirArchivo', uploadFile, handleFileUpload);

export default router;
