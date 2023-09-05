import { pool } from '../db.js';

// Consulta de todos los Articulos
export const getArticle = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM articulos');
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los artículos' });
    }
}

// Consulta de un Articulo por ID
export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM articulos WHERE id_articulo = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar el artículo con el id ${id}` });
        } else {
            res.status(200).send({ result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el artículo' });
    }
}

// Crear un nuevo Articulo
export const createArticle = async (req, res) => {
    const { id_capitulo, numero_articulo, descripcion_articulo } = req.body;
    try {
        await pool.query('INSERT INTO articulos (id_capitulo, numero_articulo, descripcion_articulo) VALUES (?, ?, ?)', [id_capitulo, numero_articulo, descripcion_articulo]);
        res.status(201).send({ message: 'Artículo creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el artículo' });
    }
}

// Actualizar un Articulo
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { id_capitulo, numero_articulo, descripcion_articulo } = req.body;
    try {
        const [result] = await pool.query('UPDATE articulos SET id_capitulo=COALESCE(?,id_capitulo), numero_articulo=COALESCE(?,numero_articulo), descripcion_articulo=COALESCE(?,descripcion_articulo) WHERE id_articulo= ?', [id_capitulo, numero_articulo, descripcion_articulo, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el artículo con el id ${id}` });
        } else {
            res.status(200).send({ message: `Artículo con el id ${id} actualizado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el artículo' });
    }
}

// Eliminar un Articulo
export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM articulos WHERE id_articulo = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el artículo con el id ${id}` });
        } else {
            res.status(200).send({ message: `Artículo con el id ${id} eliminado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el artículo' });
    }
}
