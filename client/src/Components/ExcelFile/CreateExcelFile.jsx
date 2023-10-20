import * as XLSX from 'xlsx'

/* Generar archivo excel para los aprendices que estan incluidos en solicitudes a comité de evaluación y seguimiento */
export const CreateFileReport = (apprenticesReport) => {
  // Función para reemplazar guiones bajos por espacios en un objeto
  const replaceUnderscoresWithSpaces = (obj) => {
    const newObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key.replace(/_/g, ' ')] = obj[key]
      }
    }
    return newObj
  }

  // Aplicar la función de reemplazo a cada objeto en el array
  const transformedApprenticesReport = apprenticesReport.map((apprentice) => replaceUnderscoresWithSpaces(apprentice))

  let workbook = XLSX.utils.book_new()

  // Crear una hoja de cálculo
  let ws = XLSX.utils.json_to_sheet(transformedApprenticesReport)

  // Configurar los anchos de columna (por ejemplo, el primer campo tendrá un ancho de 20)
  ws['!cols'] = Array(16).fill({ wch: 20 }) // 16 columnas con ancho 20

  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, ws, 'AprendicesEnComité')

  /* Generar un archivo de Excel */
  XLSX.writeFile(workbook, 'Informe de Aprendices para Comité de Evaluación y Seguimiento.xlsx')
}

export const CreateFileReportRequest = (reportRequest) => {
  // Función para reemplazar guiones bajos por espacios en un objeto
  const replaceUnderscoresWithSpaces = (obj) => {
    const newObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key.replace(/_/g, ' ')] = obj[key]
      }
    }
    return newObj
  }

  // Aplicar la función de reemplazo a cada objeto en el array
  const transformedRequestReport = reportRequest.map((request) => replaceUnderscoresWithSpaces(request))

  let workbook = XLSX.utils.book_new()

  // Crear una hoja de cálculo
  let ws = XLSX.utils.json_to_sheet(transformedRequestReport)

  // Configurar los anchos de columna
  ws['!cols'] = Array(16).fill({ wch: 30 }) // 16 columnas con ancho 30

  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, ws, 'EstadoSolcitud')

  /* Generar un archivo de Excel */
  XLSX.writeFile(workbook, 'Informe sobre el estado de solicitudes.xlsx')
}

export const CreateFileReportApprenticesByGroups = (apprenticesReport) => {

  const numberGroup = apprenticesReport[0].numero_ficha
  // Función para reemplazar guiones bajos por espacios en un objeto
  const replaceUnderscoresWithSpaces = (obj) => {
    const newObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key.replace(/_/g, ' ')] = obj[key]
      }
    }
    return newObj
  }

  // Aplicar la función de reemplazo a cada objeto en el array
  const transformedApprenticesReport = apprenticesReport.map((apprentice) => replaceUnderscoresWithSpaces(apprentice))

  let workbook = XLSX.utils.book_new()

  // Crear una hoja de cálculo
  let ws = XLSX.utils.json_to_sheet(transformedApprenticesReport)

  // Configurar los anchos de columna (por ejemplo, el primer campo tendrá un ancho de 20)
  ws['!cols'] = Array(16).fill({ wch: 20 }) // 16 columnas con ancho 20

  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, ws, 'AprendicesEnComitéPorFicha')

  /* Generar un archivo de Excel */
  XLSX.writeFile(workbook, `Informe de Aprendices por número de ficha ${numberGroup} para Comité de Evaluación y Seguimiento.xlsx`)
}
