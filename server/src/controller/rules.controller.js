import { pool } from '../db.js'

/* Controlador para enviar datos sobre algun registro necesario al reglamento al aprendiz guardado en la base de datos */
export const postRules = async (req, res) => {
  /* requerir datos del cuerpo de la solicitud */
  const { titulo, descripcion_capitulo, numero_articulo, descripcion_articulo, titulo_paragrafo, descripcion_paragrafo, numero_numeral, descripcion_numeral } = req.body

  try {
    /* Insertar datos en la tabla de capitulos */
    const capitulo = await pool.query('INSERT INTO capitulos (titulo, descripcion_capitulo) VALUES (?, ?)', [titulo, descripcion_capitulo])
    const idCap = capitulo[0].insertId

    /* Insertar datos en la tabla articulos */
    const articulo = await pool.query('INSERT INTO articulos (id_capitulo, numero_articulo, descripcion_articulo) VALUES (?, ?, ?)', [idCap, numero_articulo, descripcion_articulo])
    const idArt = articulo[0].insertId

    /* Insertar datos en la tabla numerales */
    await pool.query('INSERT INTO numerales (id_articulo, numero_numeral, descripcion_numeral) VALUES (?, ?, ?)', [idArt, numero_numeral, descripcion_numeral])

    /* Insertar datos en la tabla paragrafos */
    await pool.query('INSERT INTO paragrafos (id_articulo, titulo_paragrafo, descripcion_paragrafos) VALUES (?, ?, ?)', [idArt, titulo_paragrafo, descripcion_paragrafo])

    /* Enviar respuesta satisfactioria */
    res.status(200).send({ message: 'Reglamento actualizado correctamente' })
  } catch (error) {
    /* Enviar respuesta erronea en caso de algun error */
    res.status(500).send({ message: 'Error al actualizar el reglamento' })
  }
}
