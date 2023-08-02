import { Router } from 'express'
import { checkUserExistRegister, checkUserExistLogin, hashPassword, checkRegisterData, comparePassword, checkLoginData, createToken } from '../middlewares/user.middleware.js'
import { registerUser, getUser, loginUser, getTeacher } from '../controller/user.controller.js'

const router = Router()

router.get('/users', getUser)
router.get('/teachers', getTeacher)


router.post('/register', checkRegisterData, checkUserExistRegister, hashPassword, registerUser)
router.post('/login', checkLoginData, checkUserExistLogin, comparePassword, createToken, loginUser)

export default router
