import { pool } from '../db.js'

/* Generar reportes de los aprendices citados a comité de evaluación y seguimiento */
export const ReportsFileApprentice = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT 
    aprendices.id_aprendiz,
    aprendices.nombres_aprendiz,
    aprendices.apellidos_aprendiz,
    documentos.tipo_documento,
    aprendices.numero_documento_aprendiz,
    aprendices.email_aprendiz_personal,
    aprendices.email_aprendiz_sena,
    aprendices.celular_aprendiz,
    aprendices.fijo_aprendiz,
    aprendices.estado,
    fichas.numero_ficha,
    fichas.nombre_programa,
    fichas.jornada,
    fichas.etapa_programa,
    fichas.numero_trimestre,
    fichas.estado,
    GROUP_CONCAT(solicitud.id_solicitud) AS numero_solicitud
    FROM detalle_solicitud_aprendices
    INNER JOIN aprendices ON detalle_solicitud_aprendices.id_aprendiz = aprendices.id_aprendiz
    INNER JOIN fichas ON aprendices.id_ficha = fichas.id_ficha
    INNER JOIN solicitud ON detalle_solicitud_aprendices.id_solicitud = solicitud.id_solicitud
    INNER JOIN documentos ON aprendices.id_documento = documentos.id_documento
    GROUP BY aprendices.id_aprendiz;
`)

    return res.status(201).json({ result })
  } catch (error) {
    return res.status(201).json({ message: 'Error al generar reportes de los aprendices' })
  }
}

/* Generar reporte de las solicitude que han sido aprobadas y de rechazadas */
export const ReportsFileRequest = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT 
    solicitud.id_solicitud AS numero_solicitud,
    solicitud.tipo_solicitud,
    solicitud.nombre_coordinacion,
    solicitud.categoria_causa,
    solicitud.calificacion_causa,
    solicitud.descripcion_caso,
    solicitud.estado,
    solicitud.estado_descripcion,
    usuarios.nombres AS nombres_usuario_solicitante,
    usuarios.apellidos AS apellidos_usuarios_solicitante,
    documentos.tipo_documento AS tipo_documento_usuario_solicitante,
    usuarios.numero_documento AS numero_documento_usuario_solicitante,
    usuarios.email_sena AS email_sena_usuario_solicitante,
    usuarios.numero_celular AS numero_celular_usuario_solicitante,
    usuarios.estado AS estado_usuario_solicitante
    FROM solicitud
    INNER JOIN usuarios ON solicitud.id_usuario_solicitante = usuarios.id_usuario
    INNER JOIN documentos ON usuarios.id_documento = documentos.id_documento
    WHERE solicitud.estado = 'Aprobado' OR solicitud.estado = 'Rechazado'
`)

    return res.status(201).json({ result })
  } catch (error) {
    return res.status(201).json({ message: 'Error al generar reportes de las solicitudes' })
  }
}

/* Generar reporte de los aprendices que estan asociados a una solicitud de comité de evaluación y seguimiento según el número de ficha */
export const ReportsFileApprenticeByGroup = async (req, res) => {
  const { numero_ficha } = req.query

  try {
    const [result] = await pool.query(
      `SELECT 
      aprendices.id_aprendiz,
      aprendices.nombres_aprendiz,
      aprendices.apellidos_aprendiz,
       documentos.tipo_documento,
      aprendices.numero_documento_aprendiz,
      aprendices.email_aprendiz_personal,
      aprendices.email_aprendiz_sena,
      aprendices.celular_aprendiz,
      aprendices.estado,
      aprendices.fijo_aprendiz,
      fichas.numero_ficha,
      fichas.nombre_programa,
      fichas.jornada,
      fichas.etapa_programa,
      fichas.numero_trimestre,
      fichas.estado,
      GROUP_CONCAT(solicitud.id_solicitud) AS numero_solicitud
      FROM aprendices
      INNER JOIN fichas ON aprendices.id_ficha = fichas.id_ficha
      INNER JOIN documentos ON aprendices.id_documento = documentos.id_documento
      LEFT JOIN detalle_solicitud_aprendices ON aprendices.id_aprendiz = detalle_solicitud_aprendices.id_aprendiz
      LEFT JOIN solicitud ON detalle_solicitud_aprendices.id_solicitud = solicitud.id_solicitud
      WHERE fichas.numero_ficha = ?
      AND detalle_solicitud_aprendices.id_aprendiz IS NOT NULL
      GROUP BY aprendices.id_aprendiz;`,
      [numero_ficha]
    )
    if (!result[0]) {
      res.status(400).send({ message: 'La ficha no se encuentra disponible' })
    } else {
      return res.status(201).json({ result })
    }
  } catch (error) {
    return res.status(201).json({ message: 'Error al generar reportes de los aprendices por numero de ficha' })
  }
}
