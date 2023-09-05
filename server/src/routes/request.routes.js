import { Router } from "express";
import { createRequest, getRequestById, getRequests, updateRequest, deleteRequest, } from "../controller/request.controller.js";
import { createDataSolicitud } from "../middlewares/request.middlewares.js";
const router =Router();

/* El código que proporcionó define las rutas para manejar solicitudes HTTP relacionadas con
"solicitudes" (solicitudes) en una aplicación Node.js Express. */
//GET solicitudes
router.get('/solicitudes', getRequests)
// GETBYID  solicitud
router.get('/solicitud/:id', getRequestById)
//POST solicitud
router.post('/createSolicitud',createDataSolicitud, createRequest )
//PUT solicitud
router.patch('/updateSolicitud/:id', updateRequest)
//DELETE solicitud
router.delete('/deleteSolicitud/:id', deleteRequest)

export default router