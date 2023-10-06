import {Router} from 'express'
import { changeStateMessage, countMessageById, getNotifyByUserId } from '../controller/notify.controller.js'

const router = Router()

/* Obtener los mensajes por ID de usuario */
router.get('/notifyByIdUser/:id', getNotifyByUserId)

router.get('/countMessageId/:id', countMessageById)

/* Actualizar el estado del mensaje */
router.patch('/updateMessageState/:id', changeStateMessage)

export default router