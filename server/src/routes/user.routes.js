import { Router } from 'express'
import { checkUserExist, hashPassword, checkRegisterData, comparePassword, checkLoginData, createToken } from '../middlewares/user.middleware.js'
import { regiserUser, getUser, loginUser, getTeacher } from '../controller/user.controller.js'

const router = Router()

router.get('/users', getUser)
router.get('/teachers', getTeacher)


router.post('/register', checkRegisterData, checkUserExist, hashPassword, regiserUser)
router.post('/login', checkLoginData, comparePassword, createToken, loginUser)

export default router
