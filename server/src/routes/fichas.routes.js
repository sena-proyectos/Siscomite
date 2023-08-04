import { Router } from "express";
import { createFicha, getFichas } from "../controller/fichas.controller.js";

const router = Router()

router.get('/fichas', getFichas) 

// CREATE FICHA
router.get('/createFicha', createFicha) 

export default router