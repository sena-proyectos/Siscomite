import { Router } from "express";
import { createRequest, getRequestById, getRequests, updateRequest, deleteRequest, } from "../controller/request.controller.js";

const router =Router();

//GET solicitudes
router.get('/solicitudes', getRequests);
// GETBYID  solicitud
router.get('/solicitud/:id', getRequestById);
//POST solicitud
router.post('/createSolicitud', createRequest);
//PUT solicitud
router.put('/updateSolicitud/:id', updateRequest);
//DELETE solicitud
router.delete('/deleteSolicitud/:id', deleteRequest);

export default router