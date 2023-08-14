import { pool } from "../db.js";

//CONSULTAR TODAS LAS CAUSAS
/**
 * La función getCause recupera una lista de causas de una base de datos y la envía como respuesta.
 */
export const getCause = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM causas')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las causas' })
    }
}

//CONSULTAR UNA CAUSA
/**
 * La función getCauseById recupera una causa de una base de datos en función de su ID y envía una
 * respuesta con el resultado.
 */
export const getCauseById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM causas WHERE id_causa = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar la causa con el id ${id}` })
        } else {
            res.status(200).send({ result })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener la causa' })
    }
}

//CREAR UNA NUEVA CAUSA
/**
 * La función crea una causa al insertar datos en una tabla de base de datos.
 */
export const createCause = async (req, res) => {
    const {
    categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body
    try {
        await pool.query('INSERT INTO causas ( categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo) VALUES (?, ?, ?, ?, ?)', [categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo]);
        res.status(201).send({ message: 'Causa creada exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la causa' })  
    }
}

//ACTUALIZAR UNA CAUSA
/**
 * La función `updateCause` actualiza una causa en una base de datos en función de los parámetros
 * proporcionados.
 */
export const updateCause = async (req, res) => {
    const { id } = req.params;
    const { categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body;
    try {
        const [result] = await pool.query('UPDATE causas SET categoria_causa=?, calificacion_causa=?, descripcion_caso=?, evidencias=?, id_articulo=? WHERE id_causa=?', [categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la causa con el id ${id}` })
        } else {
            res.status(200).send({ message: `Causa con id ${id} actualizada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la causa' })
    }
}

//ELIMINAR UNA CAUSA
/**
 * La función `deleteCause` es una función asíncrona que elimina una causa de una tabla de base de
 * datos según la ID proporcionada.
 */
export const deleteCause = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM causas WHERE id_causa = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la causa con el id ${id}` })
        } else {
            res.status(200).send({ message: `Causa con el id ${id} eliminada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar la causa' })

    }
}


