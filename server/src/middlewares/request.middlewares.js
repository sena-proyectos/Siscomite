import { createSolicitud } from '../schemas/request.schemas.js'
import { pool } from '../db.js'


export const createDataSolicitud = (req, res, next) => {
    const {tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz } = req.body
    const idParsedCausa = Number(id_causa)
    const idParsedUser = Number(id_usuario_solicitante)
    const idParsedAprendiz = Number(id_aprendiz)
    
    try {
        if (isNaN(idParsedCausa)) return res.status(400).json({ message: 'La causa no es valida.' })
        if (isNaN(idParsedUser)) return res.status(400).json({ message: 'El usuario no es valido.' })
        if (isNaN(idParsedAprendiz)) return res.status(400).json({ message: 'El aprendiz no es valido.' })
        const { error } = createSolicitud.validate({ tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos de la solicitud no son válidos, verifícalos.' })
    next()
    } catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
    }
}