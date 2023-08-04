import { pool } from "../db.js";

export const getFichas = async (res) => {
    try {
        const [results] = await pool.query('SELECT * FROM fichas')
        res.status(200).send({results})
    } catch (error) {
        res.status(500).send({ message : 'Error al listar las fichas' })
    }
}

export const createFicha = (req, res) => {
    const { num_ficha, nombre_programa_formacion } = req.body


}