import { pool } from '../db.js';

//CONSULTA DE TODOS LOS ARTICULOS
/**
 * La función `getArticle` recupera todos los artículos de una base de datos y los envía como
 * respuesta.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Es una instancia del objeto Express `Response`.
 */
export const getArticle = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM articulos')
        res.status(200).send({result})
    } catch (error) {
        res.status(500).send({ message: 'Error al listar los articulos' })
    }
}

//CONSULTA DE UN ARTICULO
/**
 * La función `getArticleById` es una función asíncrona que recupera un artículo de una base de datos
 * en función de su ID y envía una respuesta con el resultado.
 */
export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM articulos WHERE id_articulo = ?', [id]);
        if (result.length === 0) {
            res.status(404).send({ message: `No se pudo encontrar el articulo con el id ${id}` })
        } else {
            res.status(200).send({ result })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el articulo' })
        console.log(error);
    }
}

//CREACION DE UN NUEVO ARTICULO
/**
 * La función `createArticle` es una función asíncrona que crea un nuevo artículo en una tabla de base
 * de datos llamada "articulos" utilizando los datos proporcionados en el cuerpo de la solicitud.
 */
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

//ACTUALIZAR UN ARTICULO
/**
 * La función `updateArticle` actualiza un artículo en una base de datos según el ID proporcionado y el
 * cuerpo de la solicitud.
 */
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const {numero_articulo, prohibicion_articulo, descripcion_articulo } = req.body;
    try {
        const [result] = await pool.query('UPDATE articulos SET numero_articulo=?, prohibicion_articulo=?, descripcion_articulo=? WHERE id_articulo=?', [numero_articulo, prohibicion_articulo, descripcion_articulo, id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el articulo con el id ${id}` })
        } else {
            res.status(200).send({ message: `Articulo con el id ${id} actualizado exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el articulo' })
        console.log(error);
    }
}

//ELIMINAR UN ARTICULO
/**
 * La función `deleteArticle` es una función asíncrona que elimina un artículo de una base de datos en
 * función de su ID.
 */
export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM articulos WHERE id_articulo = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: `No se pudo encontrar el articulo con el id ${id}` })
        } else {
            res.status(200).send({ message: `Articulo con el id ${id} eliminado exitosamente` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el Articulo' })
        console.log(error);
    }
}