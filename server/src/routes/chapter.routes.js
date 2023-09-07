import { Router } from "express";
import { createChapter, getChapter, updateChapter } from "../controller/chapter.controller.js";


const router = Router();


//GET capitulo
router.get('/capitulos', getChapter)
//GETBYID capitulo
router.get('/capitulo/:id', )
//POST capitulos
router.post('/createCapitulo', createChapter)
//Put capitulos
router.put('/updateCapitulo/:id', updateChapter)

export default router
