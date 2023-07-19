import { Router } from 'express'
import { index } from '../controller/index.controller.js'

const router = Router()

router.get('/', index)

export default router