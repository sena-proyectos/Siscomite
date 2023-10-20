// Importaciones necesarias
import * as XLSX from 'xlsx' // Importar una biblioteca para el procesamiento de archivos Excel
import Swal from 'sweetalert2' // Importar una biblioteca para mostrar alertas interactivas
import { mapValues } from '../Map/Map' // Importar una función de mapeo
import { Toaster, toast } from 'sonner' // Importar componentes para mostrar notificaciones
import { createApprentices } from '../../api/httpRequest' // Importar función para crear aprendices en la API

// Función para leer y procesar un archivo Excel
export const readExcelFile = async (file, id_ficha, reloadFetchState) => {
  if (!file) return // Salir si no se proporciona un archivo

  const reader = new FileReader() // Crear un lector de archivos
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result) // Convertir los datos del archivo en un arreglo de bytes
      const workbook = XLSX.read(data, { type: 'array' }) // Leer el archivo Excel
      const dataMap = mapValues() // Obtener un mapeo de nombres de campos a valores clave

      const resultPromises = [] // Inicializar un arreglo para almacenar promesas de resultados

      workbook.SheetNames.forEach(async (sheetName) => {
        const worksheet = workbook.Sheets[sheetName] // Obtener una hoja de trabajo
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 4, blankrows: false }) // Convertir la hoja de trabajo a JSON

        const headers = jsonData[0].map((header) => header.trim()) // Obtener los encabezados de las columnas
        const result = jsonData.slice(1).map((row) => {
          const obj = {}
          headers.forEach((header, index) => {
            const fieldName = dataMap[header] // Obtener el nombre del campo mapeado
            obj[fieldName] = row[index] === '' ? null : row[index] // Asignar valores al objeto
          })
          return obj
        })

        for (let i = 0; i < result.length; i++) {
          result[i].id_ficha = `${id_ficha}` // Agregar el ID de la ficha a cada registro
          switch (result[i].id_documento) {
            case 'CC':
              result[i].id_documento = '1' // Mapear tipos de documento a valores específicos
              break
            case 'CE':
              result[i].id_documento = '2'
              break
            case 'TI':
              result[i].id_documento = '3'
              break
            case 'PEP':
              result[i].id_documento = '4'
              break
          }
        }

        resultPromises.push(...result.map((item) => createApprentices(item))) // Agregar promesas de creación de aprendices
      })

      if (resultPromises.length > 0) {
        const responseModal = await Swal.fire({
          icon: 'question',
          title: '¡Aviso!',
          text: 'Se ha detectado 2 o más registros. ¿Desea guardar los registros?',
          confirmButtonText: 'Guardar registros',
          confirmButtonColor: '#39A900',
          denyButtonText: 'No guardar registros',
          showDenyButton: true
        })

        reloadFetchState()

        if (responseModal.isConfirmed) {
          try {
            await Promise.all(resultPromises) // Esperar a que todas las promesas se resuelvan
            toast.success('Genial!!', {
              description: 'Registros guardados exitosamente.'
            })
          } catch (error) {
            const message = error.response.data.message
            toast.error('Opss!!', {
              description: message
            })
          }
        } else if (responseModal.isDenied) {
        }
      }
    } catch (error) {
      toast.error('Opss!!', {
        description: 'Error al leer el archivo excel'
      })
    }
  }

  reader.readAsArrayBuffer(file) // Leer el archivo como un arreglo de bytes

  return <Toaster position="top-right" closeButton richColors /> // Renderizar un componente de notificación
}
