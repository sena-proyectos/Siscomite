import { ruleDataSchema } from '../schemas/rule.schema.js'

/* middleware para validar que los datos del cuerpo de la solicitud sean validos */
export const ruleMiddleaware = (req, res, next) => {
  /* Se requieren del cuerpo de la solicitud */
  const { titulo, descripcion_capitulo, numero_articulo, descripcion_articulo, titulo_paragrafo, descripcion_paragrafo, numero_numeral, descripcion_numeral } = req.body
  /* Parsear el numero del numeral */
  const numberNumeral = Number(numero_numeral)

  /* Validar si el numero es un numero valido */
  if (isNaN(numberNumeral)) return res.status(400).json({ message: 'El número del numeral no es un número válido.' })

  /* Validar que los datos requeridos del body sean digitados */
  const { error } = ruleDataSchema.validate({ titulo, descripcion_capitulo, numero_articulo, descripcion_articulo, titulo_paragrafo, descripcion_paragrafo, numero_numeral, descripcion_numeral })
  /* Enviar respuesta erronea en caso de que los datos ingresado en el cuerpo de la solicitud no sean digitados */
  if (error !== undefined) return res.status(400).json({ message: 'Los datos ingresados no son válidos, verifícalos.' })

  next()
}
