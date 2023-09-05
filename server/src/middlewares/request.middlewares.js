import { createSolicitud } from '../schemas/request.schemas.js'
import { pool } from '../db.js'

export const createDataSolicitud = (req, res, next) => {
    console.log(req.body);
    const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, id_archivo } = req.body;
    const idParsedUser = Number(id_usuario_solicitante);
    const idParsedAprendiz = Number(id_aprendiz);
    const idParsedArchivo = Number (id_archivo);

    try {
        if (isNaN(idParsedUser)) return res.status(400).json({ message: 'El usuario no es válido.' });
        if (isNaN(idParsedAprendiz)) return res.status(400).json({ message: 'El aprendiz no es válido.' });
        if (isNaN(idParsedArchivo)) return res.status(400).json({ message: 'El archivo no es válido.' });


        const { error } = createSolicitud.validate({ tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, id_archivo });
        if (error !== undefined) return res.status(400).json({ message: 'Los datos de la solicitud no son válidos, verifícalos.' });
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error inesperado' });
    }
};
