import { Router } from 'express'
import { getFiles, getSingleFile } from '../controller/file.controller.js'

const router = Router()

// Obtener archivos
router.get('/archivos', getFiles)

// Obtener un archivo por su nombre
router.get('/obtenerArchivo/:nombreArchivo', getSingleFile)

export default router
