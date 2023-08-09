import { pool } from "../db.js";

//Buscar todas las solicitudes 
export const getRequests = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM solicitud');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las solictudes' })
    }
}
//Buscar una solicitud
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
        console.log(error);
    }
}
//Creacion de la solicitud
export const createRequest = async (req, res) => {
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz } = req.body
    try {
    await pool.query('INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz) VALUES (?, ?, ?, ?, ?, ?)', [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz])
    res.status(201).send({ message: 'Solitud creada exitosamente' })
    } catch (error) {
    res.status(500).send({ message: 'Error al crear la solitud' })
    console.log(error);
    }
}

//Actualizacion de la solicitud
export const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz } = req.body;
    try {
        const [result] = await pool.query('UPDATE solicitud SET tipo_solicitud=?, nombre_coordinacion=?, id_causa=?, id_usuario_solicitante=?, id_usuario_receptor=?, id_aprendiz=? WHERE id_solicitud=?', [tipo_solicitud, nombre_coordinacion, id_causa, id_usuario_solicitante, id_usuario_receptor, id_aprendiz, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la solicitud con id ${id}` })
        } else {
            res.status(200).send({ message: `Solicitud con id ${id} actualizada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la solicitud' })
        console.log(error);
    }
}

//Eliminar una solicitud
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
        console.log(error);
    }
}