import { pool } from "../db.js";

//CONSULTA DE TODOS LOS DOCUMENTOS
/**
 * La función `getDocuments` recupera todos los documentos de una tabla de base de datos y envía el
 * resultado como respuesta.
 */
export const getDocuments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM documentos');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los documentos' });
    }
}

//CREACION DE UN NUEVO DOCUMENTO
/**
 * La función crea un documento en una tabla de base de datos con el tipo de documento proporcionado.
 */
export const createDocument = async (req, res) =>{
    const { tipo_documento } = req.body
    try {
        await pool.query('INSERT INTO documentos (tipo_documento) VALUES (?)', [tipo_documento]);
        res.status(201).send({ message: 'Documento creado exitosamente' })
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el documento' })
    }
}

//ELIMINAR UN PRODUCTO
/**
 * La función `deleteDocument` es una función asíncrona que elimina un documento de una tabla de base
 * de datos en función del ID del documento proporcionado.
 */
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
