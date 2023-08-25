import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import jwtdecoded from 'jwt-decode'
// import { mapValues } from '../mapeo/Map'
// import { GetClassByNumber, InscriptionApprentice } from '../api/httpRequest'
// import { GetTeacherByName } from '../api/httpRequest'

export const readExcelFile = async (file) => {
  if (!file) return
  const reader = new FileReader()

  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    // const dataMap = mapValues()

    workbook.SheetNames.forEach(async (sheetName) => {
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_csv(worksheet, { header: 1, blankrows: false })

      const lines = jsonData.split('\n')
      const headers = lines[0].trim().split(',')
      const result = lines.slice(1).map((line) => {
        const fields = line.trim().split(',')
        const obj = {}
        headers.forEach((header, index) => {
          const fieldName = dataMap[header]
          obj[fieldName] = fields[index] === '' ? null : fields[index]
        })
        return obj
      })

      console.log(result)

      for (let i = 0; i < result.length; i++) {
        // const nameTeacher = result[i].nombre_instructor_lider_inscripcion
        // const classNumber = result[i].id_ficha_inscripcion
        // const res = await GetTeacherByName(nameTeacher)
        // const response = await GetClassByNumber(classNumber)

        // const idUsuario = res.data.data[0].id_usuario
        // const numFicha = response.data.data[0].id_ficha

        // result[i].nombre_instructor_lider_inscripcion = `${idUsuario}`
        // result[i].numero_ficha_inscripcion = `${numFicha}`
        // result[i].id_usuario_responsable_inscripcion = `${id}`

        // if (result[i].modalidad_inscripcion === 'Pasantía') result[i].modalidad_inscripcion = '1'
        // if (result[i].modalidad_inscripcion === 'Contrato de aprendizaje') result[i].modalidad_inscripcion = '2'
        // if (result[i].modalidad_inscripcion === 'Proyecto Productivo') result[i].modalidad_inscripcion = '3'
        // if (result[i].modalidad_inscripcion === 'Monitoria') result[i].modalidad_inscripcion = '4'
        // if (result[i].modalidad_inscripcion === 'Vinculación laboral') result[i].modalidad_inscripcion = '5'
      }

      if (result.length > 2) {
        const showModal = async () => {
          const responseModal = await Swal.fire({
            icon: 'question',
            title: '¡Aviso!',
            text: 'Se ha detectado más de 2 registros en el archivo excel. ¿Desea directamente guardar todos los registros?',
            confirmButtonText: 'Guardar registros',
            confirmButtonColor: '#39A900',
            denyButtonText: 'No guardar registros',
            showDenyButton: true,
          })
          if (responseModal.isConfirmed) {
            try {
              result.forEach(async (item) => {
                // await InscriptionApprentice(item)
              })
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se han guardado todos los registros exitosamente',
              })
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al guardar los registros',
              })
            }
          } else if (responseModal.isDenied) {
            //* terminar
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
            text: 'Se han guardado todos los registros exitosamente',
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al guardar los registros',
          })
        }
      }
    })
  }

  reader.readAsArrayBuffer(file)
}