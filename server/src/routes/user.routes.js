import { Router } from 'express'
import { checkUserExistRegister, checkUserExistLogin, hashPassword, checkRegisterData, comparePassword, checkLoginData, createToken, checkName } from '../middlewares/user.middleware.js'
import { registerUser, getUser, loginUser, getTeacher, searchUser, searchTeacher, getCoordination, searchCoordination } from '../controller/user.controller.js'

const router = Router()
/* get */
router.get('/users', getUser)
router.get('/teachers', getTeacher)
router.get('/coordination', getCoordination)


router.get('/searchUser', checkName, searchUser)
router.get('/searchTeacher', checkName, searchTeacher)
router.get('/searchCoordination', checkName, searchCoordination)

/* post */
router.post('/register', checkRegisterData, checkUserExistRegister, hashPassword, registerUser)
router.post('/login', checkLoginData, checkUserExistLogin, comparePassword, createToken, loginUser)

export default router
