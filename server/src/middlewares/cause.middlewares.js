import { causeDataSchema } from "../schemas/cause.schemas"

export const checkCausaData = async (req, res, next) => {
    const {
        categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo } = req.body

        const idNumberParsed = Number(calificacion_causa)
    
        try {
            if(isNaN(idNumberParsed)) throw new Error('El numero no es valido')
            const errorSchema = causeDataSchema.validateAsync({  categoria_causa, calificacion_causa, descripcion_caso, evidencias, id_articulo })
            // if (error !== undefined) return res.send({ message: 'Los datos ingresados no son validos' })
            // next()
        } catch (error) {
            res.status(500).json({ message: error || 'Ha ocurrido un error' })
        }
}