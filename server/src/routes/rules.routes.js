import { Router } from 'express'
import { postRules } from '../controller/rules.controller.js'
import { ruleMiddleaware } from '../middlewares/rule.middleware.js'

const router = Router()

/* ruta para inserta la regla */
router.post('/createRule', ruleMiddleaware, postRules)

export default router
