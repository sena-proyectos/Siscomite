import { pool } from '../db.js'

//CONSULTAR TODAS LAS FICHAS
/**
 * La función `getFichas` recupera todos los registros de la tabla `fichas` y los envía como respuesta.
 */
  export const getFichas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM fichas');
        res.status(200).send({ result })
    } catch (error) {
        res.status(500).send({ message: 'Error al listar las fichas' })
    }
}

//CREAR UNA NUEVA FICHA
/**
 * La función `createFicha` es una función asíncrona que crea un nuevo registro en la tabla "fichas"
 * con los datos proporcionados.
 */

export const getFichaBynumFicha = async (req, res) => {
  const { numeroFicha } = req.query

  try {
    const [results] = await pool.query('SELECT * FROM fichas WHERE CONCAT (numero_ficha, " " , nombre_programa) LIKE ?', [`%${numeroFicha}%`])

    if (results.length === 0) return res.status(401).send({ message: 'No se encontró la ficha' })

    res.status(200).send({ results })
  } catch (error) {
    res.status(500).send({ message: 'Error inesperado' })
  }
}

export const createFicha = async (req, res) => {
  const { numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre, id_modalidad } = req.body
  try {
    await pool.query('INSERT INTO fichas (numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre, id_modalidad) VALUES (?, ?, ?, ?, ?, ?)', [numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre, id_modalidad])

    res.status(201).send({ message: 'Ficha creada exitosamente' })
  } catch (error) {
    res.status(500).send({ message: 'Error al crear ficha' })
  }
}

//ACTUALIZAR UNA FICHA
/**
 * La función `updateFicha` actualiza un registro en la tabla "fichas" con los datos proporcionados.
 */
export const updateFicha = async (req, res) => {

  const id_ficha = req.params.id; 
  const { numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre, id_modalidad } = req.body;
  try {
    await pool.query(
      'UPDATE fichas SET numero_ficha = IFNULL(?, numero_ficha), nombre_programa = IFNULL(?, nombre_programa), jornada = IFNULL(?, jornada), etapa_programa = IFNULL(?, etapa_programa), numero_trimestre = IFNULL(?, numero_trimestre), id_modalidad = IFNULL(?, id_modalidad) WHERE id_ficha = ?',
      [numero_ficha, nombre_programa, jornada, etapa_programa, numero_trimestre, id_modalidad, id_ficha]
    );
    res.status(200).send({ message: 'Ficha actualizada exitosamente' });


  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar ficha' })
  }
}
