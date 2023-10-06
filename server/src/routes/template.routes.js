import { Router } from "express";
import { getTemplateById, getTemplates } from "../controller/template.controller.js";

const router = Router()

router.get('/getTemplate', getTemplates)
router.get('/getTemplateById/:id', getTemplateById)

export default router