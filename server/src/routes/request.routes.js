import { Router } from 'express'
import { createRequest, getRequestById, updateRequest, deleteRequest, getsolicitud, getRules, getRequestByIdUser } from '../controller/request.controller.js'
import { createDataSolicitud } from '../middlewares/request.middlewares.js'
import { uploadFile } from '../controller/file.controller.js'
const router = Router()


// Config
/* El código que proporcionó define las rutas para manejar solicitudes HTTP relacionadas con
"solicitudes" (solicitudes) en una aplicación Node.js Express. */
//GET solicitudes
router.get('/solicitudes', getsolicitud)
router.get('/getRules', getRules)

// GET BY ID  solicitud
router.get('/solicitud/:id', getRequestById)

// Get request by id user
router.get('/solicitudByIdUser/:id', getRequestByIdUser)

//POST crear una solicitud
router.post('/createSolicitud', uploadFile, createDataSolicitud, createRequest)

//PAATCH, actualizar una solicitud
router.patch('/updateSolicitud/:id', updateRequest)

//DELETE solicitud
router.delete('/deleteSolicitud/:id', deleteRequest)

export default router

