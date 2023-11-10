import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createApprentices } from '../../../api/httpRequest'
import Swal from 'sweetalert2'
import { Toaster, toast } from 'sonner'
import { readExcelFile } from '../../ExcelFile/readexcelfile'
import { Input, Button } from '@nextui-org/react'
import { Alerts } from '../Alerts/Alerts'
import { validationStudents } from '../../../Validations/validations'

export const ModalAddStudents = ({ cerrarModal, reloadFetchState }) => {
  /* aprendices values */
  const [nombresAprendiz, setNombresAprendiz] = useState('')
  const [apellidosAprendiz, setApellidosAprendiz] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [emailSena, setEmailSena] = useState('')
  const [emailAlterno, setEmailAlterno] = useState('')
  const [numeroCelular, setNumeroCelular] = useState('')

  const excelFileRef = useRef(null)
  const { id_ficha } = useParams()

  // Lector de archivos excel
  const handleExcelFile = () => {
    const currentFile = excelFileRef.current.files[0]

    const checkFile = excelFileRef.current.files[0].name.split('.')
    reloadFetchState()
    if (checkFile[1] !== 'xlsx' && checkFile[1] !== 'xls') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Has ingresado un formato inválido. ¡Por favor escoga un formato válido de excel!',
        footer: '.xlsx, .xls'
      })
      excelFileRef.current.value = ''
      return
    }
    readExcelFile(currentFile, id_ficha, reloadFetchState)
  }

  /* enviar datos de aprendiz */
  const sendDataApprentices = async (e) => {
    e.preventDefault()

    try {
      /* Enviar datos capturados al servidor  */
      const dataValue = {
        nombres_aprendiz: nombresAprendiz.toUpperCase(),
        apellidos_aprendiz: apellidosAprendiz.toUpperCase(),
        numero_documento_aprendiz: numeroDocumento,
        email_aprendiz_sena: emailSena,
        email_aprendiz_personal: emailAlterno,
        celular_aprendiz: numeroCelular,
        id_documento: tipoDocumento,
        id_ficha
      }
      // Validacion de datos
      const { error } = validationStudents.validate(dataValue, { stripUnknown: true })
      // Realiza la validación de los datos utilizando la función "validate" de "validationStudents".
      // "dataValue" es el conjunto de datos a validar y "stripUnknown: true" elimina cualquier campo desconocido.
      if (error) {
        // Si hay un error de validación:
        const errorDetails = error.details[0] // Obtén el primer detalle de error del objeto "error".
        if (!nombresAprendiz || !apellidosAprendiz || !numeroDocumento || !emailSena || !numeroCelular || !tipoDocumento) {
          toast.error('Todos los campos con (*) son deben ser digitados')
        } else if (errorDetails.path[0] === 'numero_documento_aprendiz') {
          toast.error('El número de documento debe ser un valor numérico')
        } else if (errorDetails.path[0] === 'email_aprendiz_sena') {
          toast.error('Formato de correo institucional inválido')
        } else if (errorDetails.path[0] === 'email_aprendiz_personal' && emailAprendizPersonal !== '') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Expresión regular para validar el formato de correo electrónico
          if (!emailRegex.test(emailAprendizPersonal)) {
            toast.error('Formato de correo alterno inválido')
          }
        } else if (errorDetails.path[0] === 'celular_aprendiz') {
          toast.error('El número debe ser un valor numérico')
        }
      } else {
        // Si no hay errores de validación, procede con la creación de el aprendiz
        const response = await createApprentices(dataValue)
        const res = response.data.message
        toast.success('Genial!!', {
          description: res
        })
        reloadFetchState()
        setTimeout(() => {
          cerrarModal()
        }, 1500)
      }
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error('¡Opps!', {
        description: message
      })
    }
  }

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  return (
    <>
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center ">
        <Alerts descargarExcel contenido={'Los datos deben coincidir con los registrados en Sofía Plus'} recordatorio={'Para subir aprendices es neceario utilizar esta plantilla de Excel'} />
        <Toaster position="top-right" closeButton richColors />
        <section className={'bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          <header className="flex justify-center ">
            <h3 className="text-2xl font-semibold">
              <i className="fi fi-rr-smile-plus text-green-600 px-3"></i>
              Agregar aprendices
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          <section className="bodyModal">
            {/* Agregar aprendices */}
            <section className="relative w-[28rem] max-md:w-[20rem]">
              <section className="relative grid grid-cols-2 justify-center gap-x-8 py-[2rem]  gap-y-8 max-md:gap-y-5 overflow-auto ">
                <section className="modalInput ">
                  <div className="flex flex-wrap  items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input isRequired size="md" type="text" label="Nombre" labelPlacement={'outside'} variant={'flat'} value={nombresAprendiz} onChange={(e) => setNombresAprendiz(e.target.value)} />
                  </div>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input isRequired size="md" type="text" label="Apellido" labelPlacement={'outside'} variant={'flat'} value={apellidosAprendiz} onChange={(e) => setApellidosAprendiz(e.target.value)} />
                  </div>
                </section>
                <section>
                  <select className="bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                    <option value="">Tipo de documento*</option>
                    <option value="1">CC</option>
                    <option value="2">CE</option>
                    <option value="3">TI</option>
                    <option value="4">PEP</option>
                  </select>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input isRequired size="md" type="text" label="Documento" labelPlacement={'outside'} variant={'flat'} value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
                  </div>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input isRequired size="md" type="email" label="Correo Institucional" labelPlacement={'outside'} variant={'flat'} value={emailSena} onChange={(e) => setEmailSena(e.target.value)} />
                  </div>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input size="md" type="email" label="Correo alterno" labelPlacement={'outside'} variant={'flat'} value={emailAlterno} onChange={(e) => setEmailAlterno(e.target.value)} />
                  </div>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input isRequired maxLength={'10'} size="md" type="text" label="Número" labelPlacement={'outside'} variant={'flat'} value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} />
                  </div>
                </section>
                <section className="modalInput ">
                  <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                    <Input size="md" type="text" label="Número alterno" labelPlacement={'outside'} variant={'flat'} />
                  </div>
                </section>
              </section>
              <section className="flex justify-center gap-5">
                <label className="cursor-pointer inline-block text-[white] bg-red-700 text-center px-[20px] py-[8px] text-[15px] tracking-wide select-none shadow-lg rounded-[10px]  active:transform active:scale-90">
                  <i className="fi fi-rr-folder-upload text-[18px] mr-[10px]" />
                  Subir Excel
                  <input className="hidden" type="file" name="archivo" ref={excelFileRef} accept=".xlsx, .xls" onChange={handleExcelFile} />
                </label>
                <section className="relative grid text  ">
                  <Button variant="shadow" color="primary" id="iconSave" onClick={sendDataApprentices}>
                    <p className="tracking-wide text-15px">Guardar</p>
                    <i className="fi fi-br-check text-[15px]" />
                  </Button>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
