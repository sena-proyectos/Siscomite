import { Router } from 'express'
import { updateFicha, createFicha, getFichas, getFichaBynumFicha, getFichasById, changeStateGroups } from '../controller/fichas.controller.js'
import { createDataFicha, checkFichaExist } from '../middlewares/fichas.middleware.js'

const router = Router()

/* El código define tres rutas para una API RESTful utilizando el marco Express en JavaScript. */
// GET FICHAS

router.get('/fichas', getFichas)
router.get('/fichas/:id', getFichasById)
router.get('/fichasbynum', getFichaBynumFicha)


// CREATE FICHA
router.post('/createFicha', createDataFicha, checkFichaExist, createFicha)

// UPDATE FICHA
router.patch('/updateFicha/:id', createDataFicha, checkFichaExist, updateFicha)
router.patch('/stateFicha/:id', changeStateGroups)

export default router
