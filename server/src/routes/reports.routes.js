import { Router } from 'express'
import { ReportsFileApprentice, ReportsFileApprenticeByGroup, ReportsFileRequest } from '../controller/reports.controller.js'

const router = Router()

/* get report */
router.get('/generateReportApprentices', ReportsFileApprentice)
router.get('/generateReportRequest', ReportsFileRequest)
router.get('/generateReportByGroup', ReportsFileApprenticeByGroup)

export default router
