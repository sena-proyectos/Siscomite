import { pool } from '../db.js'
import { articleDataSchema } from '../schemas/article.schema.js';

export const checkArticleData = (req, res, next) => {
    const {
        numero_articulo, prohibicion_articulo, descripcion_articulo } = req.body

        const idNumberParsed = Number(numero_articulo)
    
        try {
            if(isNaN(idNumberParsed)) res.status(400).send({ message: 'El número de articulo no es un número valido.' })
            const { error } = articleDataSchema.validate({numero_articulo, prohibicion_articulo, descripcion_articulo})
            if (error !== undefined) return res.send({ message: 'Los datos ingresados no son validos' })
            next()
        } catch (error) {
            res.status(500).json({ message: 'Error inesperado' })
            console.log(error);
        }
}