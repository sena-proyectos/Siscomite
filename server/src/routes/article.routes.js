import { Router } from "express";
import { createArticle, deleteArticle, getArticle, getArticleById, updateArticle } from "../controller/article.controller.js";
import { checkArticleData } from './../middlewares/article.middlewares.js'

const router = Router();

/* El bloque de código define las rutas para manejar solicitudes HTTP relacionadas con artículos. */
//GET articulos
router.get('/articulos', getArticle)
//GETBYID
router.get('/articulo/:id', getArticleById)
//POST articulos
router.post('/createArticulo', checkArticleData, createArticle)
//PUT articulos
router.put('/updateArticulo/:id', updateArticle)
//DELETE articulos
router.delete('/deleteArticulo/:id', deleteArticle)

export default router
