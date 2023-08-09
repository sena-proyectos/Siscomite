import { createModalities } from '../schemas/modalities.schema.js'
import { pool } from '../db.js'


export const createDataModalities = (req, res, next) => {
    const {nombre_modalidad } = req.body
    try {
    const { error } = createModalities.validate({ nombre_modalidad })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos de la modalidad no son válidos, verifícalos.' })
    next()
    } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
    }
}