import { createDocumento } from '../schemas/documents.schemas.js'
import { pool } from '../db.js'


export const createDataDocuments = (req, res, next) => {
    const {tipo_documento } = req.body
    try {
    const { error } = createDocumento.validate({ tipo_documento })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos del documento no son válidos, verifícalos.' })
    next()
    } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
    }
}