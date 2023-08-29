import { Router } from "express";
import { getApprentices,getApprenticeById, createApprentices, updateApprentice, deleteApprentice, searchApprenticesByGroups } from "../controller/apprentices.controller.js";
import { checkApprenticeExist, checkName, createDataAprendiz } from "../middlewares/apprentices.middlewares.js";

const router = Router();

/* El código que proporcionó define las rutas para manejar las solicitudes HTTP relacionadas con los
aprendices. */
//GET aprendices
router.get('/aprendices', getApprentices)

//GET aprendices
router.get('/aprendicesByGroups',checkName, searchApprenticesByGroups)
// GETBYID  aprendiz
router.get('/aprendiz/:id', getApprenticeById)
//POST aprendices
router.post('/createAprendiz', checkApprenticeExist, createDataAprendiz, createApprentices)
//PUT aprendices
router.put('/updateAprendiz/:id', checkApprenticeExist, createDataAprendiz, updateApprentice)
//DELETE aprendices
router.delete('/deleteAprendiz/:id', deleteApprentice)

export default router