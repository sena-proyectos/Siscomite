import { Router } from "express";
import { createParagraph, deleteParagraph, getParagraph, getParagraphById, updateParagraph } from "../controller/paragraph.controller.js";


const router = Router();

/* El bloque de código define las rutas para manejar solicitudes HTTP relacionadas con artículos. */
//GET articulos
router.get('/paragrafos', getParagraph )
//GETBYID
router.get('/paragrafo/:id', getParagraphById )
//POST articulos
router.post('/createParagrafo', createParagraph )
//PUT articulos
router.put('/updateParagrafo/:id', updateParagraph)
//DELETE articulos
router.delete('/deleteParagrafo/:id', deleteParagraph )

export default router
