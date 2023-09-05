import { pool } from '../db.js';

// Consulta de todos los Paragrafos
export const getParagraph = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM paragrafos');
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los paragrafo' });
    }
}

// Consulta de un Paragrafo por ID
export const getParagraphById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM paragrafos WHERE id_paragrafo = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar el paragrafo con el id ${id}` });
        } else {
            res.status(200).send({ result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el paragrafo' });
    }
}

// Crear un nuevo Paragrafo
export const createParagraph = async (req, res) => {
    const { id_articulo, titulo_paragrafo, descripcion_paragrafos } = req.body;
    try {
        await pool.query('INSERT INTO paragrafos (id_articulo, titulo_paragrafo, descripcion_paragrafos) VALUES (?, ?, ?)', [id_articulo, titulo_paragrafo, descripcion_paragrafos]);
        res.status(201).send({ message: 'paragrafo creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el paragrafo' });
    }
}

// Actualizar un Paragrafo
export const updateParagraph = async (req, res) => {
    const { id } = req.params;
    const { id_articulo, titulo_paragrafo, descripcion_paragrafos } = req.body;
    try {
        const [result] = await pool.query('UPDATE paragrafos SET id_articulo=?, titulo_paragrafo=?, descripcion_paragrafos=? WHERE id_paragrafo=?', [id_articulo, titulo_paragrafo, descripcion_paragrafos, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el paragrafo con el id ${id}` });
        } else {
            res.status(200).send({ message: `paragrafo con el id ${id} actualizado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el paragrafo' });
    }
}

// Eliminar un Paragrafo
export const deleteParagraph = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM paragrafos WHERE id_paragrafo = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el paragrafo con el id ${id}` });
        } else {
            res.status(200).send({ message: `paragrafo con el id ${id} eliminado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el paragrafo' });
    }
}
