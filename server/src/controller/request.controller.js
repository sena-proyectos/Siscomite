import { pool } from "../db.js";

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
        const [result] = await pool.query('SELECT * FROM solicitud');
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
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz } = req.body
    try {
    await pool.query('INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado) VALUES (?, ?, ?, ?, ?, "Pendiente")', [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz])
    res.status(201).send({ message: 'Solitud creada exitosamente' })
    } catch (error) {
    res.status(500).send({ message: 'Error al crear la solitud' })
    }
}

//ACTUALIZACION DE UNA SOLICITUD
/**
 * La función `updateRequest` actualiza una solicitud en una base de datos según el ID de solicitud
 * proporcionado y los datos de la solicitud.
 */
export const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado } = req.body;
    try {
        const [result] = await pool.query('UPDATE solicitud SET IFNULL (?, tipo_solicitud), IFNULL (?, nombre_coordinacion), IFNULL (?, id_causa), IFNULL (?, id_usuario_solicitante), IFNULL (?, id_aprendiz), IFNULL (?, estado) WHERE id_solicitud=?', [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_aprendiz, estado, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud con id ${id}` })
        } else {
            res.status(200).send({ message: `Solicitud con id ${id} actualizada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la solicitud' })   
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