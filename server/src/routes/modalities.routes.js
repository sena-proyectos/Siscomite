import { Router } from "express";
import { getModalities, createModality, deleteModality, updateModality } from "../controller/modalities.controller.js";


const router  = Router();

/* El código que proporcionó define las rutas para manejar las solicitudes HTTP relacionadas con las
modalidades. */
//GET modalidades
router.get('/modalidades', getModalities)
//POST modalidad
router.post('/createModalidad', createModality)
//PUT modalidad
router.put('/updateModalidad/:id', updateModality)
//DELETE modalidad
router.delete('/deleteModalidad/:id', deleteModality)

export default router