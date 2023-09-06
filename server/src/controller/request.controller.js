import { pool } from "../db.js";
import mysql from 'mysql2/promise';


export const getsolicitud = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT *from solicitud ');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las solictudes' })
    }
}
//BUSCAR TODAS LAS SOLICITUDES
export const getRequests = async (req, res) => {
    try {
        const query = `
        SELECT
            -- Información de la solicitud
            s.id_solicitud,
            s.tipo_solicitud,
            s.nombre_coordinacion,
            s.categoria_causa,
            s.calificacion_causa,
            s.descripcion_caso,
            s.estado,
            s.fecha_creacion,
    
            -- Información del archivo relacionado a la solicitud
            ar.nombre_archivo,
            ar.ruta_archivo,
            ar.tipo_archivo,
    
            -- Información del usuario solicitante
            u.nombres AS nombres_solicitante,
            u.apellidos AS apellidos_solicitante,
            u.email_sena AS email_sena_solicitante,
            u.numero_celular AS numero_celular_solicitante,
    
            -- Tipo de documento del usuario solicitante (subconsulta)
            (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = u.id_documento) AS tipo_documento_usuario,
    
            -- Información del aprendiz
            ap.nombres_aprendiz,
            ap.apellidos_aprendiz,
            ap.email_aprendiz_sena,
            ap.celular_aprendiz,
    
            -- Tipo de documento del aprendiz (subconsulta)
            (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = ap.id_documento) AS tipo_documento_aprendiz,
    
            -- Información de la ficha
            f.numero_ficha,
            f.nombre_programa,
            f.jornada,
            f.etapa_programa,
            f.numero_trimestre,
            f.estado AS estado_ficha,
    
            -- Información de la modalidad
            m.nombre_modalidad,
    
            -- Información del usuario coordinador de la ficha
            uc.nombres AS nombres_coordinador,
            uc.apellidos AS apellidos_coordinador,
            uc.email_sena AS email_sena_coordinador,
            uc.numero_celular AS numero_celular_coordinador
        FROM solicitud s
        LEFT JOIN archivos ar ON s.id_archivo = ar.id_archivo
        LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
        LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
        LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
        LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
        LEFT JOIN usuarios uc ON f.id_usuario_coordinador = uc.id_usuario
        `;
        const [result] = await pool.query(query);
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las solicitudes' });
    }
}




//BUSCAR UNA SOLICITUD
/**
 * La función `getRequestById` es una función asíncrona que recupera una solicitud por su ID de una
 * base de datos y envía una respuesta con el resultado.
 */

export const getRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT
            -- Información de la solicitud
            s.id_solicitud,
            s.tipo_solicitud,
            s.nombre_coordinacion,
            s.categoria_causa,
            s.calificacion_causa,
            s.descripcion_caso,
            s.estado,
            s.fecha_creacion,
    
            -- Información del archivo relacionado a la solicitud
            ar.nombre_archivo,
            ar.ruta_archivo,
            ar.tipo_archivo,
    
            -- Información del usuario solicitante
            u.nombres AS nombres_solicitante,
            u.apellidos AS apellidos_solicitante,
            u.email_sena AS email_sena_solicitante,
            u.numero_celular AS numero_celular_solicitante,
    
            -- Tipo de documento del usuario solicitante (subconsulta)
            (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = u.id_documento) AS tipo_documento_usuario,
    
            -- Información del aprendiz
            ap.nombres_aprendiz,
            ap.apellidos_aprendiz,
            ap.email_aprendiz_sena,
            ap.celular_aprendiz,
    
            -- Tipo de documento del aprendiz (subconsulta)
            (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = ap.id_documento) AS tipo_documento_aprendiz,
    
            -- Información de la ficha
            f.numero_ficha,
            f.nombre_programa,
            f.jornada,
            f.etapa_programa,
            f.numero_trimestre,
            f.estado AS estado_ficha,
    
            -- Información de la modalidad
            m.nombre_modalidad,
    
            -- Información del usuario coordinador de la ficha
            uc.nombres AS nombres_coordinador,
            uc.apellidos AS apellidos_coordinador,
            uc.email_sena AS email_sena_coordinador,
            uc.numero_celular AS numero_celular_coordinador
        FROM solicitud s
        LEFT JOIN archivos ar ON s.id_archivo = ar.id_archivo
        LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
        LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
        LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
        LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
        LEFT JOIN usuarios uc ON f.id_usuario_coordinador = uc.id_usuario
        WHERE s.id_solicitud = ?;
        `;
        const [result] = await pool.query(query, [id]);
        if (result.length === 0) {
            res.status(404).send({ message: 'No se pudo encontrar la solicitud' });
        } else {
            res.status(200).send({ result: result[0] });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener la solicitud' });
    }
}


//CREACION DE UNA NUEVA SOLICITUD
/**
 * Esta función crea una solicitud insertando datos en una tabla de base de datos.
 */
export const createRequest = async (req, res) => {
    const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, id_archivo } = req.body;
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:mm:ss
        await pool.query(
            'INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, id_archivo, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, id_archivo, 'Pendiente', currentDate]
        );
        res.status(201).send({ message: 'Solicitud creada exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la solicitud' });
    }
};


//ACTUALIZACION DE UNA SOLICITUD
/**
 * La función `updateRequest` actualiza una solicitud en una base de datos según el ID de solicitud
 * proporcionado y los datos de la solicitud.
 */
export const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { 
        tipo_solicitud, 
        nombre_coordinacion, 
        id_usuario_solicitante, 
        id_aprendiz, 
        estado, 
        categoria_causa, 
        calificacion_causa, 
        descripcion_caso, 
        id_archivo
    } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE solicitud 
             SET 
                tipo_solicitud = COALESCE(?, tipo_solicitud), 
                nombre_coordinacion = COALESCE(?, nombre_coordinacion), 
                id_usuario_solicitante = COALESCE(?, id_usuario_solicitante), 
                id_aprendiz = COALESCE(?, id_aprendiz), 
                estado = COALESCE(?, estado), 
                categoria_causa = COALESCE(?, categoria_causa), 
                calificacion_causa = COALESCE(?, calificacion_causa), 
                descripcion_caso = COALESCE(?, descripcion_caso), 
                id_archivo = COALESCE(?, id_archivo)
             WHERE id_solicitud = ?`,
            [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, estado, categoria_causa, calificacion_causa, descripcion_caso, id_archivo, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud` });
        } else {
            res.status(200).send({ message: `Solicitud actualizada exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la solicitud' });
    }
}



//ELIMINACION DE UNA SOLICITUD
/**
 * La función `deleteRequest` es una función asíncrona que elimina una solicitud de una tabla de base
 * de datos según la ID proporcionada.
 */
export const deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM solicitud WHERE id_solicitud = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud con id ${id}` })
        } else {
            res.status(200).send({ message: `Solicitud con id ${id} eliminada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar la solicitud' })
    }
}