import { Router } from "express";
import { createCause, getCause } from "../controller/cause.controller.js";

const router = Router();

router.get('/causes', getCause);
router.post('/createCause', createCause);

export default router 
