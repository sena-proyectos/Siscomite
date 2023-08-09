import { Router } from "express";
import { createDocument, getDocuments, deleteDocument  } from "../controller/documents.controller.js";


const router = Router();

//GET docuemtos
router.get('/documentos', getDocuments);
//POST documentos
router.post('/createDocument', createDocument);
//DELETE documentos
router.delete('/deleteDocument/:id', deleteDocument);

export default router