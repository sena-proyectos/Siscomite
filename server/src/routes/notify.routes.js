import {Router} from 'express'
import { getNotifyByUserId } from '../controller/notify.controller.js'

const router = Router()

router.get('/notifyByIdUser/:id', getNotifyByUserId)

export default router