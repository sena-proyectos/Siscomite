import { pool } from "../db.js";

//Buscar todas las modalidades
export const getModalities = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM modalidades');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las modalidades' });
    }
}

//Creacion de una nueva modalidad
export const createModality = async (req, res) =>{
    const { nombre_modalidad } = req.body
    try {
        await pool.query('INSERT INTO modalidades (nombre_modalidad) VALUES (?)', [nombre_modalidad]);
        res.status(201).send({ message: 'Modalidad creada exitosamente' })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la modalidad' })
    }
}

//Actualizacion de la modalidad
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

//Eliminar una modalidad
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
