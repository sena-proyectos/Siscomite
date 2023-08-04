import { Router } from 'express'
import { updateFicha, createFicha, getFichas, getFichaBynumFicha } from '../controller/fichas.controller.js'
import { createDataFicha, checkFichaExist } from '../middlewares/fichas.middleware.js'

const router = Router()

// GET FICHAS
router.get('/fichas', getFichas)
router.get('/fichasbynum', getFichaBynumFicha)

// CREATE FICHA
router.post('/createFicha', createDataFicha, checkFichaExist, createFicha)

// UPDATE FICHA
router.patch('/updateFicha/:id', createDataFicha, checkFichaExist, updateFicha)

export default router
