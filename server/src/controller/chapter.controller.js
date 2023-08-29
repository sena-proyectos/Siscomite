import { pool } from '../db.js';


export const getChapter = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM capitulos')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los capitulos' })
    }
}

// Crear un nuevo Capitulo
export const createChapter = async (req, res) => {
    const { titulo, descripcion_capitulo } = req.body;
    try {
        await pool.query('INSERT INTO Capitulos (titulo, descripcion_capitulo) VALUES (?, ?)', [titulo, descripcion_capitulo]);
        res.status(201).send({ message: 'Capítulo creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el capítulo' });
    }
}
// Actualizar un capitulo
export const updateChapter = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion_capitulo } = req.body;
    try {
        const [result] = await pool.query('UPDATE capitulos SET titulo=?, descripcion_capitulo=? WHERE id_capitulo=?', [titulo, descripcion_capitulo, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el capitulo con el id ${id}` });
        } else {
            res.status(200).send({ message: `Capitulo con el id ${id} actualizado exitosamente` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el capitulo' });
    }
}