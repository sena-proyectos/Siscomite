import { Router } from 'express'
import { createRequest, getRequestById, getRequests, updateRequest, deleteRequest, getsolicitud, getRules, getRequestByIdUser } from '../controller/request.controller.js'
import { createDataSolicitud } from '../middlewares/request.middlewares.js'
const router = Router()

/* El código que proporcionó define las rutas para manejar solicitudes HTTP relacionadas con
"solicitudes" (solicitudes) en una aplicación Node.js Express. */
//GET solicitudes
router.get('/solicitudes', getsolicitud)
router.get('/getRules', getRules)

// GETBYID  solicitud
router.get('/solicitud/:id', getRequestById)

// Get request by id user
router.get('/solicitudByIdUser/:id', getRequestByIdUser)

//POST solicitud
router.post('/createSolicitud', createDataSolicitud, createRequest)

//PUT solicitud
router.patch('/updateSolicitud/:id', updateRequest)

//DELETE solicitud
router.delete('/deleteSolicitud/:id', deleteRequest)

export default router
