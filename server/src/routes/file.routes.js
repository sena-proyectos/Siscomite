import { Router } from "express";
import multerMiddleware from '../middlewares/files.middlewares.js';
import { handleFileUpload } from "../controller/file.controller.js";

const router = Router();

// Subir archivo
router.post('/subir-archivo', multerMiddleware.single('archivo'), handleFileUpload);

export default router;
