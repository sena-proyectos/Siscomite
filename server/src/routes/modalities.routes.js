import { Router } from "express";
import { createModality, deleteModality, getModalities, updateModality } from "../controller/modalities.controller.js";


const router  = Router();

//GET modalidades
router.get('/modalidades', getModalities);
//POST modalidad
router.post('/createModalidad', createModality);
//PUT modalidad
router.put('/updateModalidad/:id', updateModality);
//DELETE modalidad
router.delete('/deleteModalidad/:id', deleteModality)

export default router