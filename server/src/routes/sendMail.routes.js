import { Router } from 'express'
import { sendEmail, sendEmailWithAttachment } from '../controller/sendMail.controller.js'
import { checkEmail } from '../middlewares/email.middleware.js'
import multer from 'multer'

const router = Router()
const upload = multer()

/* enviar email */
router.post('/sendEmail', sendEmail)

/* enviar email con archivo */
router.post('/emailFile', upload.single('file'), sendEmailWithAttachment)

export default router
