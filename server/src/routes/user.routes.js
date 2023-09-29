import { Router } from 'express'
import { checkUserExistRegister, checkUserExistLogin, hashPassword, checkRegisterData, comparePassword, checkLoginData, createToken, checkName, updatePassword, hashPasswordUpdate, validateUser } from '../middlewares/user.middleware.js'
import { registerUser, getUser, loginUser, getTeacher, searchUser, searchTeacher, getCoordination, searchCoordination, userById, updateUserById, usersById, changeStateAccount } from '../controller/user.controller.js'

const router = Router()
/* get */
router.get('/users', getUser)
router.get('/teachers', getTeacher)
router.get('/coordination', getCoordination)

router.get('/user/:id', userById)
router.get('/users/:id', usersById)

router.get('/searchUser', checkName, searchUser)
router.get('/searchTeacher', checkName, searchTeacher)
router.get('/searchCoordination', checkName, searchCoordination)

/* post */
router.post('/register', checkRegisterData, checkUserExistRegister, hashPassword, registerUser)
router.post('/login', checkLoginData, checkUserExistLogin, validateUser, comparePassword, createToken, loginUser)

/* patch */
router.patch('/updateUser/:id', updatePassword, hashPasswordUpdate, updateUserById)

router.patch('/stateUser/:id', changeStateAccount)

export default router
