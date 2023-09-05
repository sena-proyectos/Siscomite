import { pool } from '../db.js';

// Consulta de todos los Numerales
export const getArticleNumber = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM numerales');
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los numerales' });
    }
}

// Consulta de un Numeral por ID
export const getArticleNumberById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM numerales WHERE id_numeral = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar el numeral con el id ${id}` });
        } else {
            res.status(200).send({ result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el numeral' });
    }
}

// Crear un nuevo Numeral
export const createArticleNumber = async (req, res) => {
    const { id_articulo, numero_numeral, descripcion_numeral } = req.body;
    try {
        await pool.query('INSERT INTO numerales (id_articulo, numero_numeral, descripcion_numeral) VALUES (?, ?, ?)', [id_articulo, numero_numeral, descripcion_numeral]);
        res.status(201).send({ message: 'Numeral creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el numeral' });
    }
}

// Actualizar un Numeral
export const updateArticleNumber = async (req, res) => {
    const { id } = req.params;
    const { id_articulo, numero_numeral, descripcion_numeral } = req.body;
    try {
        const [result] = await pool.query('UPDATE numerales SET id_articulo=?, numero_numeral=?, descripcion_numeral=? WHERE id_numeral=?', [id_articulo, numero_numeral, descripcion_numeral, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el numeral con el id ${id}` });
        } else {
            res.status(200).send({ message: `Numeral con el id ${id} actualizado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el numeral' });
    }
}

// Eliminar un Numeral
export const deleteArticleNumber = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM numerales WHERE id_numeral = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el numeral con el id ${id}` });
        } else {
            res.status(200).send({ message: `Numeral con el id ${id} eliminado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el numeral' });
    }
}
