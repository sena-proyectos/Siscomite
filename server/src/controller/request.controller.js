import { pool } from '../db.js'
import mysql from 'mysql2/promise'

export const getsolicitud = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT usuarios.nombres, usuarios.apellidos, solicitud.id_solicitud, solicitud.tipo_solicitud,solicitud.nombre_coordinacion,solicitud.estado,solicitud.fecha_creacion,solicitud.categoria_causa,solicitud.calificacion_causa,solicitud.descripcion_caso,solicitud.id_archivo FROM solicitud INNER JOIN usuarios ON solicitud.id_usuario_solicitante = usuarios.id_usuario ORDER BY fecha_creacion DESC;')
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al listar las solictudes' })
  }
}
//BUSCAR TODAS LAS SOLICITUDES
export const getRequests = async (req, res) => {
  try {
    const query = `
        SELECT
        -- Información de la solicitud
        s.id_solicitud,
        s.tipo_solicitud,
        s.nombre_coordinacion,
        s.estado,
        s.fecha_creacion,
        s.categoria_causa,
        s.calificacion_causa,
        s.descripcion_caso,
        s.evidencias,
    
        -- Información del artículo
        a.numero_articulo,
        a.descripcion_articulo,
    
        -- Información del capítulo relacionado al artículo
        c.titulo AS titulo_capitulo,
        c.descripcion_capitulo,
    
        -- Información de los numerales relacionados al artículo
        GROUP_CONCAT(n.numero_numeral ORDER BY n.id_numeral ASC) AS numeros_numerales,
        GROUP_CONCAT(n.descripcion_numeral ORDER BY n.id_numeral ASC) AS descripciones_numerales,
    
        -- Información de los párrafos relacionados al artículo
        GROUP_CONCAT(p.titulo_paragrafo ORDER BY p.id_paragrafo ASC) AS titulos_paragrafos,
        GROUP_CONCAT(p.descripcion_paragrafos ORDER BY p.id_paragrafo ASC) AS descripciones_paragrafos,
    
        -- Información del usuario solicitante
        u.nombres AS nombres_solicitante,
        u.apellidos AS apellidos_solicitante,
        u.email_sena AS email_sena_solicitante,
        u.numero_celular AS numero_celular_solicitante,
    
        -- Tipo de documento del usuario solicitante (subconsulta)
        (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = u.id_documento) AS tipo_documento_usuario,
    
        -- Información del aprendiz
        ap.nombres_aprendiz,
        ap.apellidos_aprendiz,
        ap.email_aprendiz_sena,
        ap.celular_aprendiz,
    
        -- Tipo de documento del aprendiz (subconsulta)
        (SELECT d.tipo_documento FROM documentos d WHERE d.id_documento = ap.id_documento) AS tipo_documento_aprendiz,
    
        -- Información de la ficha
        f.numero_ficha,
        f.nombre_programa,
        f.jornada,
        f.etapa_programa,
        f.numero_trimestre,
    
        -- Información de la modalidad
        m.nombre_modalidad
    FROM solicitud s
    LEFT JOIN articulos a ON s.id_articulo = a.id_articulo
    LEFT JOIN numerales n ON a.id_articulo = n.id_articulo
    LEFT JOIN paragrafos p ON a.id_articulo = p.id_articulo
    LEFT JOIN capitulos c ON a.id_capitulo = c.id_capitulo
    LEFT JOIN usuarios u ON s.id_usuario_solicitante = u.id_usuario
    LEFT JOIN aprendices ap ON s.id_aprendiz = ap.id_aprendiz
    LEFT JOIN fichas f ON ap.id_ficha = f.id_ficha
    LEFT JOIN modalidades m ON f.id_modalidad = m.id_modalidad
    GROUP BY s.id_solicitud;
    `
    const [result] = await pool.query(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al listar las solictudes' })
  }
}

//BUSCAR UNA SOLICITUD
/**
 * La función `getRequestById` es una función asíncrona que recupera una solicitud por su ID de una
 * base de datos y envía una respuesta con el resultado.
 */

export const getRequestById = async (req, res) => {
  const { id } = req.params
  try {
    const query = `SELECT
      solicitud.id_solicitud,
      solicitud.tipo_solicitud,
      solicitud.nombre_coordinacion,
      solicitud.id_usuario_solicitante,
      solicitud.estado,
      solicitud.estado_descripcion AS descripcion_estado_solicitud,
      solicitud.fecha_creacion,
      solicitud.categoria_causa,
      solicitud.calificacion_causa,
      solicitud.descripcion_caso,
      solicitud.id_archivo AS id_archivo_solicitud,
      usuarios_solicitante.nombres AS nombre_usuario_solicitante,
      usuarios_solicitante.apellidos AS apellidos_usuario_solicitante,
      usuarios_solicitante.numero_documento AS numero_documento_usuario_solicitante,
      usuarios_solicitante.email_sena AS email_sena_usuario_solicitante,
      usuarios_solicitante.email_personal AS email_personal_usuario_solicitante,
      usuarios_solicitante.numero_celular AS numero_celular_usuario_solicitante,
      usuarios_solicitante.telefono_fijo AS telefono_fijo_usuario_solicitante,
      usuarios_solicitante.estado AS estado_usuario_solicitante,
      documentos_solicitante.tipo_documento AS tipo_documento_solicitante,
      detalle_solicitud_aprendices.id_aprendiz,
      aprendices.nombres_aprendiz AS nombres_aprendices,
      aprendices.apellidos_aprendiz AS apellidos_aprendices,
      aprendices.numero_documento_aprendiz AS numero_documento_aprendiz,
      aprendices.email_aprendiz_sena AS email_aprendiz_sena,
      aprendices.email_aprendiz_personal AS email_aprendiz_personal,
      aprendices.celular_aprendiz AS celular_aprendiz,
      aprendices.fijo_aprendiz AS fijo_aprendiz,
      aprendices.estado AS estado_aprendiz,
      documentos_aprendiz.tipo_documento AS tipo_documento_aprendiz,
      fichas.numero_ficha AS numero_ficha,
      fichas.nombre_programa AS nombre_programa_ficha,
      fichas.jornada AS jornada_ficha,
      fichas.etapa_programa AS etapa_programa_ficha,
      fichas.numero_trimestre AS numero_trimestre_ficha,
      fichas.estado AS estado_ficha,
      modalidades.nombre_modalidad AS nombre_modalidad,
      detalle_solicitud_numerales.id_numeral,
      numerales.numero_numeral AS numero_numeral,
      numerales.descripcion_numeral AS descripcion_numeral,
      articulos.numero_articulo AS numero_articulo,
      articulos.descripcion_articulo AS descripcion_articulos,
      capitulos.titulo AS titulo_capitulo,
      paragrafos.descripcion_paragrafos AS descripcion_paragrafos,
      archivos.nombre_archivo AS nombre_archivo,
      archivos.ruta_archivo AS ruta_archivo,
      archivos.tipo_archivo AS tipo_archivo
  FROM solicitud
  LEFT JOIN usuarios AS usuarios_solicitante ON solicitud.id_usuario_solicitante = usuarios_solicitante.id_usuario
  LEFT JOIN documentos AS documentos_solicitante ON usuarios_solicitante.id_documento = documentos_solicitante.id_documento
  LEFT JOIN detalle_solicitud_aprendices ON solicitud.id_solicitud = detalle_solicitud_aprendices.id_solicitud
  LEFT JOIN aprendices ON detalle_solicitud_aprendices.id_aprendiz = aprendices.id_aprendiz
  LEFT JOIN documentos AS documentos_aprendiz ON aprendices.id_documento = documentos_aprendiz.id_documento
  LEFT JOIN fichas ON aprendices.id_ficha = fichas.id_ficha
  LEFT JOIN modalidades ON fichas.id_modalidad = modalidades.id_modalidad
  LEFT JOIN detalle_solicitud_numerales ON solicitud.id_solicitud = detalle_solicitud_numerales.id_solicitud
  LEFT JOIN numerales ON detalle_solicitud_numerales.id_numeral = numerales.id_numeral
  LEFT JOIN articulos ON numerales.id_articulo = articulos.id_articulo
  LEFT JOIN capitulos ON articulos.id_capitulo = capitulos.id_capitulo
  LEFT JOIN paragrafos ON numerales.id_numeral = paragrafos.id_paragrafo
  LEFT JOIN archivos ON solicitud.id_archivo = archivos.id_archivo
  WHERE solicitud.id_solicitud = ?

  UNION ALL

  SELECT
      solicitud.id_solicitud,
      solicitud.tipo_solicitud,
      solicitud.nombre_coordinacion,
      solicitud.id_usuario_solicitante,
      solicitud.estado,
      solicitud.estado_descripcion AS descripcion_estado_solicitud,
      solicitud.fecha_creacion,
      solicitud.categoria_causa,
      solicitud.calificacion_causa,
      solicitud.descripcion_caso,
      solicitud.id_archivo AS id_archivo_solicitud,
      usuarios_involucrados.nombres AS nombre_usuario_involucrado,
      usuarios_involucrados.apellidos AS apellidos_usuario_involucrado,
      usuarios_involucrados.numero_documento AS numero_documento_usuario_involucrado,
      usuarios_involucrados.email_sena AS email_sena_usuario_involucrado,
      usuarios_involucrados.email_personal AS email_personal_usuario_involucrado,
      usuarios_involucrados.numero_celular AS numero_celular_usuario_involucrado,
      usuarios_involucrados.telefono_fijo AS telefono_fijo_usuario_involucrado,
      usuarios_involucrados.estado AS estado_usuario_involucrado,
      documentos_involucrados.tipo_documento AS tipo_documento_usuario_involucrado,
      NULL AS id_aprendiz,
      NULL AS nombres_aprendices,
      NULL AS apellidos_aprendices,
      NULL AS numero_documento_aprendiz,
      NULL AS email_aprendiz_sena,
      NULL AS email_aprendiz_personal,
      NULL AS celular_aprendiz,
      NULL AS fijo_aprendiz,
      NULL AS estado_aprendiz,
      NULL AS tipo_documento_aprendiz,
      NULL AS numero_ficha,
      NULL AS nombre_programa_ficha,
      NULL AS jornada_ficha,
      NULL AS etapa_programa_ficha,
      NULL AS numero_trimestre_ficha,
      NULL AS estado_ficha,
      NULL AS nombre_modalidad,
      NULL AS id_numeral,
      NULL AS numero_numeral,
      NULL AS descripcion_numeral,
      NULL AS numero_articulo,
      NULL AS descripcion_articulos,
      NULL AS titulo_capitulo,
      NULL AS descripcion_paragrafos,
      NULL AS nombre_archivo,
      NULL AS ruta_archivo,
      NULL AS tipo_archivo
  FROM solicitud
  LEFT JOIN detalle_solicitud_usuarios ON solicitud.id_solicitud = detalle_solicitud_usuarios.id_solicitud
  LEFT JOIN usuarios AS usuarios_involucrados ON detalle_solicitud_usuarios.id_usuario = usuarios_involucrados.id_usuario
  LEFT JOIN documentos AS documentos_involucrados ON usuarios_involucrados.id_documento = documentos_involucrados.id_documento
  WHERE solicitud.id_solicitud = ?;

   
    `
    const [result] = await pool.query(query, [id, id])

    if (result.length === 0) {
      res.status(404).send({ message: `No hay registros de la solicitud` })
    } else {
      res.status(200).send({ result: result })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener la solicitud' })
  }
}

// Obtener reglamento
export const getRules = async (req, res) => {
  try {
    const sqlQuery = `
    WITH RankedData AS (
      SELECT
        numerales.id_numeral,
        numerales.numero_numeral,
        numerales.descripcion_numeral,
        articulos.numero_articulo,
        articulos.descripcion_articulo,
        capitulos.titulo AS titulo_capitulo,
        ROW_NUMBER() OVER (PARTITION BY capitulos.id_capitulo, articulos.id_articulo ORDER BY numerales.id_numeral) AS RowNum
      FROM
        numerales
      INNER JOIN
        articulos
      ON
        numerales.id_articulo = articulos.id_articulo
      INNER JOIN
        capitulos
      ON
        articulos.id_capitulo = capitulos.id_capitulo
    )
    SELECT
      id_numeral,
      numero_numeral,
      descripcion_numeral,
      CASE WHEN RowNum = 1 THEN numero_articulo ELSE NULL END AS numero_articulo,
      descripcion_articulo,
      CASE WHEN RowNum = 1 THEN titulo_capitulo ELSE NULL END AS titulo_capitulo,
      CASE WHEN RowNum = 1 THEN @chapterTitle := titulo_capitulo ELSE NULL END AS currentChapter
    FROM RankedData
    CROSS JOIN (SELECT @chapterTitle := '') AS vars
    ORDER BY id_numeral;`

    const [result] = await pool.query(sqlQuery)
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el reglamento' })
  }
}

//CREACION DE UNA NUEVA SOLICITUD
/**
 * Esta función crea una solicitud insertando datos en una tabla de base de datos.
 */
export const createRequest = async (req, res) => {
  const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, categoria_causa, calificacion_causa, descripcion_caso, numeralesSeleccionados, aprendicesSeleccionados, instructoresSeleccionados } = req.body

  const numeralesArray = Array.isArray(numeralesSeleccionados) ? numeralesSeleccionados : [numeralesSeleccionados]
  const instructoresArray = Array.isArray(instructoresSeleccionados) ? instructoresSeleccionados : [instructoresSeleccionados]
  const aprendicesArray = Array.isArray(aprendicesSeleccionados) ? aprendicesSeleccionados : [aprendicesSeleccionados]

  try {
    /* Verifica el tipo de archivo */
    if (req.fileValidationError) {
      return res.status(400).send({ message: 'Tipo de archivo no permitido' })
    }

    /* Validar selección de numerales */
    if (!numeralesSeleccionados || numeralesSeleccionados.length === 0) {
      return res.status(400).send({ message: 'Debe seleccionar al menos un numeral' })
    }

    /* Validar selección de aprendices */
    if (!aprendicesSeleccionados || aprendicesSeleccionados.length === 0) {
      return res.status(400).send({ message: 'Debe seleccionar al menos un aprendiz' })
    }

    /*  Subir el archivo y obtener su ID */
    const { filename } = req.file
    const fileType = req.file.mimetype

    /* Insertar el archivo en la base de datos si es necesario */
    const resultFile = await pool.query('INSERT INTO archivos (nombre_archivo, ruta_archivo, tipo_archivo) VALUES (?, ?, ?)', [filename, `Downloads/Evidencias-Siscomite${filename}`, fileType])
    const fileId = resultFile[0].insertId

    /* Crear la solicitud */
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato YYYY-MM-DD HH:mm:ss
    const result = await pool.query('INSERT INTO solicitud (tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, categoria_causa, calificacion_causa, descripcion_caso, id_archivo, estado, estado_descripcion, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, categoria_causa, calificacion_causa, descripcion_caso, fileId, 'En proceso', 'Verificando información para la aprobación de la solicitud', currentDate])
    const solicitudId = result[0].insertId

    /* Insertar numerales infringidos */
    numeralesArray.forEach(async (numeroId) => {
      try {
        await pool.query('INSERT INTO detalle_solicitud_numerales (id_solicitud, id_numeral) VALUES (?, ?)', [solicitudId, numeroId])
      } catch (error) {
        res.status(400).send({ message: 'No se pudieron asociar los numerales a la solicitud' })
        return
      }
    })

    /* Insertar aprendiz relacionado */
    if (!aprendicesArray) return res.status(400).send({ message: 'Debe seleccionar al menos un aprendiz' })
    aprendicesArray.forEach(async (aprendizId) => {
      try {
        await pool.query('INSERT INTO detalle_solicitud_aprendices (id_solicitud, id_aprendiz) VALUES (?, ?)', [solicitudId, aprendizId])
      } catch (error) {
        res.status(400).send({ message: 'Aprendiz seleccionado incorrectamente' })
        return
      }
    })

    /* Insertar instructor relacionado */
    instructoresArray.forEach(async (usuarioId) => {
      try {
        await pool.query('INSERT INTO detalle_solicitud_usuarios (id_solicitud, id_usuario) VALUES (?, ?)', [solicitudId, usuarioId])
      } catch (error) {
        res.status(400).send({ message: 'Instructor seleccionado incorrectamente' })
        return
      }
    })

    /* Enviar respuesta existosa */
    res.status(201).send({ message: 'Solicitud creada exitosamente' })
  } catch (error) {
    res.status(500).send({ message: 'Error al crear la solicitud' })
  }
}

//ACTUALIZACION DE UNA SOLICITUD
/**
 * La función `updateRequest` actualiza una solicitud en una base de datos según el ID de solicitud
 * proporcionado y los datos de la solicitud.
 */
export const updateRequest = async (req, res) => {
  const { id } = req.params
  const { tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, estado, estado_descripcion, categoria_causa, calificacion_causa, descripcion_caso } = req.body

  try {
    const [result] = await pool.query('UPDATE solicitud SET tipo_solicitud = COALESCE(?, tipo_solicitud), nombre_coordinacion = COALESCE(?, nombre_coordinacion), id_usuario_solicitante = COALESCE(?, id_usuario_solicitante), estado = COALESCE(?, estado),estado_descripcion = COALESCE(?, estado_descripcion), categoria_causa = COALESCE(?, categoria_causa), calificacion_causa = COALESCE(?, calificacion_causa), descripcion_caso = COALESCE(?, descripcion_caso) WHERE id_solicitud = ? ', [tipo_solicitud, nombre_coordinacion, id_usuario_solicitante, estado, estado_descripcion, categoria_causa, calificacion_causa, descripcion_caso, id])

    if (result.affectedRows === 0) {
      res.status(404).send({ message: `No se pudo encontrar la solicitud` })
    } else {
      res.status(200).send({ message: `Solicitud actualizada exitosamente` })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar la solicitud' })
  }
}

//ELIMINACION DE UNA SOLICITUD
/**
 * La función `deleteRequest` es una función asíncrona que elimina una solicitud de una tabla de base
 * de datos según la ID proporcionada.
 */
export const deleteRequest = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('DELETE FROM solicitud WHERE id_solicitud = ?', [id])
    if (result.affectedRows === 0) {
      res.status(404).send({ message: `No se pudo encontrar la solicitud con id ${id}` })
    } else {
      res.status(200).send({ message: `Solicitud con id ${id} eliminada exitosamente` })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar la solicitud' })
  }
}

// OBTENER SOLICITUDES POR ID DE USUARIO
export const getRequestByIdUser = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('SELECT usuarios.nombres, usuarios.apellidos, solicitud.id_solicitud, solicitud.tipo_solicitud,solicitud.nombre_coordinacion, solicitud.estado,solicitud.fecha_creacion,solicitud.categoria_causa,solicitud.calificacion_causa,solicitud.descripcion_caso,solicitud.id_archivo FROM solicitud INNER JOIN usuarios ON solicitud.id_usuario_solicitante = usuarios.id_usuario WHERE id_usuario_solicitante = ? ORDER BY fecha_creacion DESC;', [id])

    if (result.affectedRows === 0) return res.status(404).send({ message: `No has realizado ninguna solicitud` })

    return res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener la solicitud' })
  }
}
