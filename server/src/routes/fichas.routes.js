import { Router } from 'express'
import { updateFicha, createFicha, getFichas } from '../controller/fichas.controller.js'
import { createDataFicha, checkFichaExist } from '../middlewares/fichas.middleware.js'

const router = Router()

// GET FICHAS
router.get('/fichas', getFichas)

// CREATE FICHA
router.post('/createFicha', createDataFicha, checkFichaExist, createFicha)

// UPDATE FICHA
router.patch('/updateFicha/:id', createDataFicha, updateFicha)

export default router
