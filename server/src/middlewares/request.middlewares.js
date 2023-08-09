import { createSolicitud } from '../schemas/request.schemas'
import { pool } from '../db.js'


export const createDataSolicitud = (req, res, next) => {
    const {tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz } = req.body
    try {
    const { error } = createSolicitud.validate({ tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos de la solicitud no son válidos, verifícalos.' })
    next()
    } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
    }
}