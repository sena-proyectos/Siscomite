import { Router } from "express";
import { createArticleNumber, deleteArticleNumber, getArticleNumber, getArticleNumberById, updateArticleNumber } from "../controller/articleNumber.controller.js";


const router = Router();

/* El bloque de código define las rutas para manejar solicitudes HTTP relacionadas con artículos. */
//GET articulos
router.get('/numerales', getArticleNumber)
//GETBYID
router.get('/numeral/:id', getArticleNumberById)
//POST articulos
router.post('/createNumeral', createArticleNumber)
//PUT articulos
router.put('/updateNumeral/:id', updateArticleNumber)
//DELETE articulos
router.delete('/deleteNumeral/:id', deleteArticleNumber)

export default router
