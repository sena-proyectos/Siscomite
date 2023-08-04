import { pool } from '../db.js';

export const getArticle = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM articulos')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los articulos' })
    }
}

export const createArticle = async (req, res) => {
    const {
        numero_articulo, prohibicion_articulo, descripcion_articulo } = req.body
    try {
        await pool.query('INSERT INTO articulos ( numero_articulo, prohibicion_articulo, descripcion_articulo) VALUES (?, ?, ?)', [numero_articulo, prohibicion_articulo, descripcion_articulo]);
        res.status(201).send({ message: 'Articulo creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el articulo' })
    }
}