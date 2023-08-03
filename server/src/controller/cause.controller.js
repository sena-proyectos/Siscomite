import { pool } from "../db.js";

export const getCause = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM causas')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las causas' })
    }
}

export const createCause = async (req, res) => {
    const {
       categoria_causa, calificacion_causa, descripcion_causa, evidencias, id_articulo } = req.body
    try {
        await pool.query('INSERT INTO articulos ( categoria_causa, calificacion_causa, descripcion_causa, evidencias, id_articulo) VALUES (?, ?, ?, ?, 1)', [categoria_causa, calificacion_causa, descripcion_causa, evidencias, id_articulo]);
        res.status(201).send({ message: 'Causa creada exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la causa' })
    }
}

