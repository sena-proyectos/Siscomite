import { Router } from "express";
import { getFiles, downloadFile } from "../controller/file.controller.js";



const router = Router();

// Obtener archivos
router.get('/archivos', getFiles);
// Obtener un archivo por su nombre
//router.get('/obtenerArchivo/:nombreArchivo', getSingleFile);
// Subir archivo
//router.post('/subirArchivo', uploadFile, handleFileUpload);
router.get('/descargarArchivo/:archivoId', downloadFile);

export default router;
