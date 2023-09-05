import { pool } from "../db.js";
import mysql from 'mysql2/promise';

//BUSCAR TODAS LAS SOLICITUDES
export const getRequests = async (req, res) => {
    try {
        const query = `
        SELECT
        -- Información de la solicitud
        s.id_solicitud,
        s.tipo_solicitud,
        s.nombre_coordinacion,
        s.estado,
        s.fecha_creacion,
        s.categoria_causa,
        s.calificacion_causa,
        s.descripcion_caso,
        s.evidencias,
    
        -- Información del artículo
        a.numero_articulo,
        a.descripcion_articulo,
    
        -- Información del capítulo relacionado al artículo
        c.titulo AS titulo_capitulo,
        c.descripcion_capitulo,
    
        -- Información de los numerales relacionados al artículo
        GROUP_CONCAT(n.numero_numeral ORDER BY n.id_numeral ASC) AS numeros_numerales,
        GROUP_CONCAT(n.descripcion_numeral ORDER BY n.id_numeral ASC) AS descripciones_numerales,
    
        -- Información de los párrafos relacionados al artículo
        GROUP_CONCAT(p.titulo_paragrafo ORDER BY p.id_paragrafo ASC) AS titulos_paragrafos,
        GROUP_CONCAT(p.descripcion_paragrafos ORDER BY p.id_paragrafo ASC) AS descripciones_paragrafos,
    
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
    
        -- Información de la modalidad
        m.nombre_modalidad
    FROM solicitud s
    LEFT JOIN articulos a ON s.id_articulo = a.id_articulo
    LEFT JOIN numerales n ON a.id_articulo = n.id_articulo
    LEFT JOIN paragrafos p ON a.id_articulo = p.id_articulo
    LEFT JOIN capitulos c ON a.id_capitulo = c.id_capitulo
    LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
    LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
    LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
    LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
    GROUP BY s.id_solicitud;
    `;
        const [result] = await pool.query(query);
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las solictudes' })
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
        s.estado,
        s.fecha_creacion,
        s.categoria_causa,
        s.calificacion_causa,
        s.descripcion_caso,
        s.evidencias,
    
        -- Información del artículo
        a.numero_articulo,
        a.descripcion_articulo,
    
        -- Información del capítulo relacionado al artículo
        c.titulo AS titulo_capitulo,
        c.descripcion_capitulo,
    
        -- Información de los numerales relacionados al artículo
        GROUP_CONCAT(n.numero_numeral ORDER BY n.id_numeral ASC) AS numeros_numerales,
        GROUP_CONCAT(n.descripcion_numeral ORDER BY n.id_numeral ASC) AS descripciones_numerales,
    
        -- Información de los párrafos relacionados al artículo
        GROUP_CONCAT(p.titulo_paragrafo ORDER BY p.id_paragrafo ASC) AS titulos_paragrafos,
        GROUP_CONCAT(p.descripcion_paragrafos ORDER BY p.id_paragrafo ASC) AS descripciones_paragrafos,
    
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
    
        -- Información de la modalidad
        m.nombre_modalidad
    FROM solicitud s
    LEFT JOIN articulos a ON s.id_articulo = a.id_articulo
    LEFT JOIN numerales n ON a.id_articulo = n.id_articulo
    LEFT JOIN paragrafos p ON a.id_articulo = p.id_articulo
    LEFT JOIN capitulos c ON a.id_capitulo = c.id_capitulo
    LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
    LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
    LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
    LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
    WHERE s.id_solicitud = ?;    
    `;
        const [result] = await pool.query(query, [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud con id ${id}` });
        } else {
            res.status(200).send({ result: result[0] });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener la solicitud' });
    }
};

//CREACION DE UNA NUEVA SOLICITUD
/**
 * Esta función crea una solicitud insertando datos en una tabla de base de datos.
 */

export const createRequest = async (req, res) => {
    const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body;
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:mm:ss
        await pool.query(
            'INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo, 'Pendiente', currentDate]
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
    const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, estado, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE solicitud SET tipo_solicitud = COALESCE(?, tipo_solicitud), nombre_coordinacion = COALESCE(?, nombre_coordinacion), id_usuario_solicitante = COALESCE(?, id_usuario_solicitante), id_aprendiz = COALESCE(?, id_aprendiz), estado = COALESCE(?, estado), categoria_causa = COALESCE(?, categoria_causa), calificacion_causa = COALESCE(?, calificacion_causa), descripcion_caso = COALESCE(?, descripcion_caso), evidencias = COALESCE(?, evidencias), id_articulo = COALESCE(?, id_articulo) WHERE id_solicitud = ?',
            [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, id_aprendiz, estado, categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud` });
        } else {
            res.status(200).send({ message: `Solicitud actualizada exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la solicitud' });
    }
};


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