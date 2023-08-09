import { pool } from "../db.js";

//Consulta de todos los documentos 
export const getDocuments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM documentos');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los documentos' });
    }
}

//Creacion de un nuevo documento
export const createDocument = async (req, res) =>{
    const { tipo_documento } = req.body
    try {
        await pool.query('INSERT INTO documentos (tipo_documento) VALUES (?)', [tipo_documento]);
        res.status(201).send({ message: 'Documento creado exitosamente' })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el documento' })
    }
}

//Eliminar un documento
export const deleteDocument = async (req,res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM documentos WHERE id_documento = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encotrar el documento con el id ${id}`})
            console.log(error);
        } else {
            res.status(200).send({ message: `Documento con id ${id} eliminado exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el documento' })
        console.log(error);
    }
}
