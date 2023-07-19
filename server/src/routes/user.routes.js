import { Router } from 'express'
import { checkUserExist } from '../middlewares/user.middleware.js'
import { regiserUser, getUser } from '../controller/user.controller.js'

const router = Router()

router.get('/users', getUser)
router.post('/register', checkUserExist, regiserUser)

export default router