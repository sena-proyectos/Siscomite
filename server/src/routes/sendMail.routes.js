import { Router } from 'express'
import { sendEmail } from '../controller/sendMail.controller.js'
import { checkEmail } from '../middlewares/email.middleware.js'
const router = Router()

router.post('/sendEmail', checkEmail, sendEmail)

export default router
