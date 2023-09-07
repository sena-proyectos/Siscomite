import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { mapValues } from '../Map/Map'
// import { ModalExcel } from '../Utils/Modals/ModalExcel'
import { Toaster, toast } from 'sonner'
import { createApprentices } from '../../api/httpRequest'

// ... (importaciones y código previo)

export const readExcelFile = async (file, id_ficha) => {
  if (!file) return

  const reader = new FileReader()

  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const dataMap = mapValues()

      const resultPromises = []

      workbook.SheetNames.forEach(async (sheetName) => {
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 4, blankrows: false })

        const headers = jsonData[0].map((header) => header.trim())
        const result = jsonData.slice(1).map((row) => {
          const obj = {}
          headers.forEach((header, index) => {
            const fieldName = dataMap[header]
            obj[fieldName] = row[index] === '' ? null : row[index]
          })
          return obj
        })

        for (let i = 0; i < result.length; i++) {
          result[i].id_ficha = `${id_ficha}`
          switch (result[i].id_documento) {
            case 'CC':
              result[i].id_documento = '1'
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

        resultPromises.push(...result.map((item) => createApprentices(item)))
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

        if (responseModal.isConfirmed) {
          try {
            await Promise.all(resultPromises)
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
          console.log('bueno')
        }
      }
    } catch (error) {
      console.error('Error reading Excel file:', error)
    }
  }

  reader.readAsArrayBuffer(file)

  return <Toaster position="top-right" closeButton richColors />
}
