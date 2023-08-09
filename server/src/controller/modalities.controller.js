import { pool } from "../db.js";

//BUSCAR TODAS LAS MODALIDADES
/**
 * La función `getModalities` recupera una lista de modalidades de una base de datos y la envía como
 * respuesta.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada por el cliente. Incluye detalles como el método de solicitud, los
 * encabezados, los parámetros de consulta y el cuerpo.
 * @param res - El parámetro "res" es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Es un objeto que contiene métodos y propiedades relacionadas con la respuesta HTTP, como
 * status(), send() y json(). En este fragmento de código, se utiliza para enviar el resultado de la
 * base de datos.
 */
export const getModalities = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM modalidades');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las modalidades' });
    }
}

//CREACION DE UNA NUEVA MODALIDAD
/**
 * La función crea una nueva modalidad en una tabla de base de datos llamada "modalidades" con el valor
 * "nombre_modalidad" proporcionado.
 */
export const createModality = async (req, res) =>{
    const { nombre_modalidad } = req.body
    try {
        await pool.query('INSERT INTO modalidades (nombre_modalidad) VALUES (?)', [nombre_modalidad]);
        res.status(201).send({ message: 'Modalidad creada exitosamente' })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la modalidad' })
    }
}

//ACTUALIZACION DE UNA MODALIDAD
/**
 * La función `updateModality` actualiza el nombre de una modalidad en una tabla de base de datos según
 * la ID proporcionada.
 */
export const updateModality = async (req, res) => {
    const { id } = req.params;
    const { nombre_modalidad } = req.body;
    try {
        const [result] = await pool.query('UPDATE modalidades SET nombre_modalidad=? WHERE id_modalidad=?', [nombre_modalidad, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar la modalidad con id ${id}` })
        } else {
            res.status(200).send({ message: `Modalidad con id ${id} actualizada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la modalidad' })
        console.log(error);
    }
}

//ELIMINAR UNA MODALIDAD
/**
 * La función `deleteModality` es una función asíncrona que elimina una modalidad de una tabla de base
 * de datos según la ID proporcionada.
 */
export const deleteModality = async (req,res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM modalidades WHERE id_modalidad = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encotrar la modalidad con el id ${id}`})
            console.log(error);
        } else {
            res.status(200).send({ message: `Modalidad con id ${id} eliminada exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar la modalidad' })
        console.log(error);
    }
}
