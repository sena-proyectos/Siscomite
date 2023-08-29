import { Router } from "express";
import { getApprentices,getApprenticeById, createApprentices, updateApprentice, deleteApprentice } from "../controller/apprentices.controller.js";
import { checkApprenticeExist, createDataAprendiz } from "../middlewares/apprentices.middlewares.js";

const router = Router();

/* El código que proporcionó define las rutas para manejar las solicitudes HTTP relacionadas con los
aprendices. */
//GET aprendices
router.get('/aprendices', getApprentices)
// GETBYID  aprendiz
router.get('/aprendiz/:id', getApprenticeById)
//POST aprendices
router.post('/createAprendiz', checkApprenticeExist, createDataAprendiz, createApprentices)
//PUT aprendices
router.put('/updateAprendiz/:id', checkApprenticeExist, createDataAprendiz, updateApprentice)
//DELETE aprendices
router.delete('/deleteAprendiz/:id', deleteApprentice)

export default router