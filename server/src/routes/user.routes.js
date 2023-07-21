import { Router } from 'express'
import { checkUserExist, hashPassword, checkRegisterData } from '../middlewares/user.middleware.js'
import { regiserUser, getUser } from '../controller/user.controller.js'

const router = Router()

router.get('/users', getUser)
router.post('/register', checkRegisterData, checkUserExist, hashPassword, regiserUser)

export default router
