import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import jwtdecoded from 'jwt-decode'
import { mapValues } from '../Map/Map'
import { ModalExcel } from '../Utils/Modal/ModalExcel'
// import { GetClassByNumber, InscriptionApprentice } from '../api/httpRequest'
// import { GetTeacherByName } from '../api/httpRequest'

export const readExcelFile = async (file, id_ficha) => {
  if (!file) return
  const reader = new FileReader()

  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const dataMap = mapValues()

    workbook.SheetNames.forEach(async (sheetName) => {
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 4 })

      const headers = jsonData[0].map((header) => header.trim())
      const result = jsonData.slice(1).map((row) => {
        const obj = {}
        headers.forEach((header, index) => {
          const fieldName = dataMap[header]
          obj[fieldName] = row[index] === '' ? null : row[index]
        })
        return obj
      })

      console.log(result)

      for (let i = 0; i < result.length; i++) {
        result[i].id_ficha = `${id_ficha}`
        if (result[i].id_documento === 'CC') result[i].id_documento = '1'
        if (result[i].id_documento === 'CE') result[i].id_documento = '2'
        if (result[i].id_documento === 'TI') result[i].id_documento = '3'
        if (result[i].id_documento === 'PEP') result[i].id_documento = '4'
      }

      if (result.length >= 2) {
        const showModal = async () => {
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
              result.forEach(async (item) => {
                // await InscriptionApprentice(item)
              })
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se han guardado todos los registros exitosamente'
              })
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al guardar los registros'
              })
            }
          } else if (responseModal.isDenied) {
            console.log('bueno')
          }
        }
        showModal()
      } else {
        try {
          result.forEach(async (item) => {
            // await InscriptionApprentice(item)
          })
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se han guardado todos los registros exitosamente'
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al guardar los registros'
          })
        }
      }
    })
  }

  reader.readAsArrayBuffer(file)
  return <ModalExcel></ModalExcel>
}
