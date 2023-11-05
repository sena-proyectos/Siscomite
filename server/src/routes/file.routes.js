import { Router } from 'express'
import { getFiles, getSingleFile, getSingleFileByApprentice } from '../controller/file.controller.js'

const router = Router()

// Obtener archivos
router.get('/archivos', getFiles)

// Obtener un archivo por su nombre
router.get('/obtenerArchivo/:nombreArchivo', getSingleFile)

/* obtener archivo por nombre e id_aprendiz */
router.get('/fileByApprentice/:id', getSingleFileByApprentice)

export default router
