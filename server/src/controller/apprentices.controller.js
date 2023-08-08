import { pool } from "../db.js";

export const getApprentices = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM aprendices');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los aprendices' })
    }
}

export const getApprenticeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM aprendices WHERE id_aprendiz = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
        } else {
            res.status(200).send({ result })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el aprendiz' })
        console.log(error);
    }
}

export const createApprentices = async (req, res) => {
    const { nombres_aprendiz, apellidos_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha } = req.body
    try {
    await pool.query('INSERT INTO aprendices (nombres_aprendiz, apellidos_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombres_aprendiz, apellidos_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha])
    res.status(201).send({ message: 'Aprendiz creado exitosamente' })
    } catch (error) {
    res.status(500).send({ message: 'Error al crear el aprenndiz' })
    }
}

export const updateApprentice = async (req, res) => {
    const { id } = req.params;
    const { nombres_aprendiz, apellidos_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha } = req.body;
    try {
        const [result] = await pool.query('UPDATE aprendices SET nombres_aprendiz=?, apellidos_aprendiz=?, email_aprendiz_sena=?, email_aprendiz_personal=?, celular_aprendiz=?, id_documento=?, id_ficha=? WHERE id_aprendiz=?', [nombres_aprendiz, apellidos_aprendiz, email_aprendiz_sena, email_aprendiz_personal, celular_aprendiz, id_documento, id_ficha, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
        } else {
            res.status(200).send({ message: `Aprendiz con id ${id} actualizado exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el aprendiz' })
        console.log(error);
    }
}

export const deleteApprentice = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM aprendices WHERE id_aprendiz = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar al aprendiz con id ${id}` })
        } else {
            res.status(200).send({ message: `Aprendiz con id ${id} eliminado exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el aprendiz' })
        console.log(error);
    }
}