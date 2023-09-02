import { pool } from "../db.js";
import mysql from 'mysql2/promise';

//BUSCAR TODAS LAS SOLICITUDES
/**
 * La función `getRequests` recupera todos los registros de la tabla `solicitud` y los envía como
 * respuesta.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud. Se utiliza para recuperar datos del lado del cliente y pasarlos al
 * código del lado del servidor.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto Express `Response`.
 */
export const getRequests = async (req, res) => {
    try {
        const query = `
        SELECT
            s.id_solicitud,
            s.tipo_solicitud,
            s.nombre_coordinacion,
            s.estado,
            s.fecha_creacion,
            s.id_causa,
            c.categoria_causa,
            c.calificacion_causa,
            c.descripcion_caso,
            c.evidencias,
            c.id_articulo,
            a.numero_articulo,
            a.prohibicion_articulo,
            a.descripcion_articulo,
            s.id_usuario_solicitante,
            u.nombres AS nombres_solicitante,
            u.apellidos AS apellidos_solicitante,
            u.numero_documento AS numero_documento_solicitante,
            u.email_sena AS email_sena_solicitante,
            u.email_personal AS email_personal_solicitante,
            u.numero_celular AS numero_celular_solicitante,
            u.telefono_fijo AS telefono_fijo_solicitante,
            u.id_documento AS id_documento_solicitante,
            u.id_rol AS id_rol_solicitante,
            r.nombre_rol AS nombre_rol_solicitante,
            s.id_aprendiz,
            ap.id_aprendiz,
            ap.nombres_aprendiz,
            ap.apellidos_aprendiz,
            ap.numero_documento_aprendiz,
            ap.email_aprendiz_sena,
            ap.email_aprendiz_personal,
            ap.celular_aprendiz,
            ap.fijo_aprendiz,
            ap.id_documento AS id_documento_aprendiz,
            ap.id_ficha,
            f.id_ficha,
            f.numero_ficha,
            f.nombre_programa,
            f.jornada,
            f.etapa_programa,
            f.numero_trimestre,
            f.id_modalidad,
            m.id_modalidad,
            m.nombre_modalidad,
            d.id_documento AS id_documento_aprendiz,
            d.tipo_documento,
            u_doc.id_documento AS id_documento_usuario,
            u_doc.tipo_documento AS tipo_documento_usuario,
            u.id_rol AS id_rol_usuario,
            r.id_rol AS id_rol,
            r.nombre_rol

        FROM solicitud s
        LEFT JOIN causas c ON s.id_causa = c.id_causa
        LEFT JOIN articulos a ON c.id_articulo = a.id_articulo
        LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
        LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
        LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
        LEFT JOIN documentos d ON ap.id_documento = d.id_documento
        LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
        LEFT JOIN documentos u_doc ON u.id_documento = u_doc.id_documento
        LEFT JOIN roles r ON u.id_rol = r.id_rol;
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
        const [result] = await pool.query('SELECT * FROM solicitud WHERE id_solicitud = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solictud con id ${id}`})
        } else {
            res.status(200).send({ result })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el solicitud' })
    }
}

//CREACION DE UNA NUEVA SOLICITUD
/**
 * Esta función crea una solicitud insertando datos en una tabla de base de datos.
 */

export const createRequest = async (req, res) => {
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz } = req.body;
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:mm:ss
        await pool.query(
            'INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, 'Pendiente', currentDate]
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
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE solicitud SET tipo_solicitud = COALESCE(?, tipo_solicitud), nombre_coordinacion = COALESCE(?, nombre_coordinacion), id_causa = COALESCE(?, id_causa), id_usuario_solicitante = COALESCE(?, id_usuario_solicitante), id_aprendiz = COALESCE(?, id_aprendiz), estado = COALESCE(?, estado) WHERE id_solicitud = ?',
            [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado, id]
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