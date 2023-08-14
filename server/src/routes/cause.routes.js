import { Router } from "express";
import { createCause, deleteCause, getCause, getCauseById, updateCause } from "../controller/cause.controller.js";

const router = Router();

/* El código define diferentes rutas para una API RESTful utilizando el marco Express en JavaScript. */
//GET Causas
router.get('/causas', getCause);
//GETBYID Causas
router.get('/causa/:id', getCauseById)
//POST Causas
router.post('/createCause', createCause)
//PUT Causa
router.put('/updateCausa/:id', updateCause)
//DELETE Causa
router.put('/deleteCausa/:id', deleteCause)

export default router 
