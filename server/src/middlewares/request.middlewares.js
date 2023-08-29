import { createSolicitud } from '../schemas/request.schemas.js'
import { pool } from '../db.js'


export const createDataSolicitud = (req, res, next) => {
    console.log(req.body)
    const {tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body
    const idParsedUser = Number(id_usuario_solicitante)
    const idParsedAprendiz = Number(id_aprendiz)
    const idParsedArticulo = Number(id_articulo)

    
    try {
        if (isNaN(idParsedUser)) return res.status(400).json({ message: 'El usuario no es valido.' })
        if (isNaN(idParsedAprendiz)) return res.status(400).json({ message: 'El aprendiz no es valido.' })
        if (isNaN(idParsedArticulo)) return res.status(400).json({ message: 'El Articulo no es valido.' })

        const { error } = createSolicitud.validate({ tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo })
    if (error !== undefined) return res.status(400).json({ message: 'Los datos de la solicitud no son válidos, verifícalos.' })
    next()
} catch (error) {
    return res.status(500).json({ message: 'Error inesperado' })
    }
}