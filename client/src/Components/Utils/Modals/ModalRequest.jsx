import { Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'

import { downloadFile, getRequestById } from '../../../api/httpRequest'

import { format } from 'date-fns' // Importar biblioteca para formatear las fechas
import { TinyEditor } from '../tinyEditor/TinyEditor'

import { summonsLetter, actFormat } from '../TemplateStatic/TemplateStatic'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT

export const ModalRequest = ({ cerrarModal, requestID }) => {
  // Estados para almacenar los datos completos de aprendices, usuarios y numerales
  const [aprendices, setAprendices] = useState([])
  const [usuarios, setUsuarios] = useState([])

  /* estados para almacenar los datos de la solicitud */
  const [tipoSolicitud, setTipoSolicitud] = useState(null)
  const [nombreCoordinacion, setNombreCoordinacion] = useState(null)
  const [estado, setEstado] = useState(null)
  const [categoriaCausa, setCategoriaCausa] = useState(null)
  const [calificacionCausa, setCalificacionCausa] = useState(null)
  const [descripcionCaso, setDescripcionCaso] = useState(null)
  const [TituloCapitulo, setTituloCapitulo] = useState(null)
  const [fechaCreacion, setFechaCreacion] = useState(null)
  const [archivoNombre, setNombreArchivo] = useState(null)

  /* estados para almacenar los datos de las infracciones */
  const [numeroArticulo, setNumeroArticulo] = useState(null)
  const [numerales, setNumerales] = useState([])

  const [modalCitation, setModalCitation] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [valueFile, setValuefile] = useState(null)

  useEffect(() => {
    getIdRequest(requestID)
  }, [requestID])

  const getIdRequest = async (requestID) => {
    try {
      const response = await getRequestById(requestID)
      const res = response.data.result

      // Crear un conjunto para almacenar los objetos únicos
      const datosUnicos = new Set()

      res.forEach((item) => {
        // Utilizar JSON.stringify para convertir cada objeto en una cadena
        const itemString = JSON.stringify(item)
        datosUnicos.add(itemString)
      })

      /* Datos detallados de la solicitud */
      const datosUnicosArray = Array.from(datosUnicos).map((itemString) => JSON.parse(itemString))

      // Arrays para almacenar los datos completos de aprendices y usuarios sin duplicados
      const aprendicesData = []
      const usuariosData = []

      // Iterar sobre los datos y agregarlos a los arrays correspondientes
      res.forEach((item) => {
        /* Aprendices */
        if (item.tipo_documento_aprendiz && item.nombres_aprendices) {
          const aprendiz = {
            tipoDocumento: item.tipo_documento_aprendiz,
            nombres: item.nombres_aprendices,
            apellidos: item.apellidos_aprendices,
            numeroDocumento: item.numero_documento_aprendiz,
            emailSena: item.email_aprendiz_sena,
            emailPersonal: item.email_aprendiz_personal,
            celular: item.celular_aprendiz,
            fijo: item.fijo_aprendiz,
            numeroFicha: item.numero_ficha,
            nombreProgramaFicha: item.nombre_programa_ficha
          }
          aprendicesData.push(aprendiz)
        }

        /* Usuarios */
        if (item.tipo_documento_solicitante && item.nombre_usuario_solicitante) {
          const usuario = {
            tipoDocumento: item.tipo_documento_solicitante,
            nombres: item.nombre_usuario_solicitante,
            apellidos: item.apellidos_usuario_solicitante,
            numeroDocumento: item.numero_documento_usuario_solicitante,
            emailSena: item.email_sena_usuario_solicitante,
            emailPersonal: item.email_personal_usuario_solicitante,
            celular: item.numero_celular_usuario_solicitante,
            fijo: item.telefono_fijo_usuario_solicitante
          }
          usuariosData.push(usuario)
        }

        if (item.numero_numeral && item.descripcion_numeral) {
          const numeral = {
            numero: item.numero_numeral,
            descripcion: item.descripcion_numeral
          }
          numerales.push(numeral)
        }
      })

      // Convertir los objetos únicos de nuevo a objetos JSON de la solicitud
      const tipoSolicitud = [...new Set(datosUnicosArray.map((item) => item.tipo_solicitud))]
      const nombreCoordinacion = [...new Set(datosUnicosArray.map((item) => item.nombre_coordinacion))]
      const estado = [...new Set(datosUnicosArray.map((item) => item.estado))]
      const categoriaCausa = [...new Set(datosUnicosArray.map((item) => item.categoria_causa))]
      const calificacionCausa = [...new Set(datosUnicosArray.map((item) => item.calificacion_causa))]
      const descripcionCaso = [...new Set(datosUnicosArray.map((item) => item.descripcion_caso))]
      const tituloCapitulo = [...new Set(datosUnicosArray.map((item) => item.titulo_capitulo))]
      const fechaCreacion = [...new Set(datosUnicosArray.map((item) => item.fecha_creacion))]
      const nombreArchivo = [...new Set(datosUnicosArray.map((item) => item.nombre_archivo))]

      // Convertir los objetos únicos de nuevo a objetos JSON de las infracciones
      const numeroArticulo = [...new Set(datosUnicosArray.map((item) => item.numero_articulo))]

      // Eliminar duplicados utilizando un conjunto para cada tipo de datos
      const uniqueAprendicesData = Array.from(new Set(aprendicesData.map(JSON.stringify)), JSON.parse)
      const uniqueUsuariosData = Array.from(new Set(usuariosData.map(JSON.stringify)), JSON.parse)
      const uniqueNumerales = Array.from(new Set(numerales.map(JSON.stringify)), JSON.parse)

      // Asignar los arrays de datos a los estados correspondientes
      setAprendices(uniqueAprendicesData)
      setUsuarios(uniqueUsuariosData)

      /* Datos de la solicitud */
      setTipoSolicitud(tipoSolicitud)
      setNombreCoordinacion(nombreCoordinacion)
      setEstado(estado)
      setCategoriaCausa(categoriaCausa)
      setCalificacionCausa(calificacionCausa)
      setDescripcionCaso(descripcionCaso)
      setTituloCapitulo(tituloCapitulo)
      setFechaCreacion(fechaCreacion[0])
      setNombreArchivo(nombreArchivo[0])

      /* Datos de las infracciones */
      setNumeroArticulo(numeroArticulo)
      setNumerales(uniqueNumerales)
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error inesperado'
      })
    }
  }

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  // Función para obtener la clase CSS en función del estado
  const getStatusColorClass = (estado) => {
    if (estado === 'Aprobado') {
      return 'bg-green-200 text-success rounded-2xl'
    } else if (estado === 'En proceso') {
      return 'bg-yellow-200 text-warning'
    } else if (estado === 'Rechazado') {
      return 'bg-red-200 text-danger rounded-2xl'
    } else {
      // Clase CSS por defecto (negro) si el estado no coincide con ninguno de los anteriores
      return 'text-black'
    }
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'yyyy-MM-dd')
  }

  // Cerrar o abrir apartado de generar documentos
  const generateCitationModal = () => {
    setModalCitation(!modalCitation)
  }

  const handleSelectChange = (e) => {
    const value = e.target.value
    if (value === '') setValuefile('')
    // Concatena el nombre del archivo seleccionado con la ruta de la carpeta "public"
    setSelectedFile(value)
  }

  /* Funcion que reemplaza los datos de las plantillas seleccionadas y que se ejecuta cada que se renderiza el componente */
  useEffect(() => {
    const onFileUpload = async () => {
      if (selectedFile) {
        // Variable que contiene la plantilla seleccionada
        let content = selectedFile

        // Construir una cadena con los datos de los aprendices
        const nombresAprendices = aprendices.map((aprendiz) => aprendiz.nombres + ' ' + aprendiz.apellidos).join(', ')
        const correosAprendices = aprendices.map((aprendiz) => aprendiz.emailSena).join(', ')
        const numeroFicha = aprendices.map((aprendiz) => aprendiz.numeroFicha).join(', ')
        const programaFicha = aprendices.map((aprendiz) => aprendiz.nombreProgramaFicha).join(', ')

        const nombresInstructores = usuarios.map((usuarios) => usuarios.nombres + ' ' + usuarios.apellidos).join(', ')
        const faltas = numerales.map((numerales) => TituloCapitulo + numeroArticulo + `${numerales.numero}` + '. ' + numerales.descripcion).join(', ')

        /* CARTA DE CITACIÓN */
        // Reemplazar el marcador con la cadena de texto para la carta de citación
        content = content.replace('*NombreAprendiz*', nombresAprendices)
        content = content.replace('*CorreoElectronico*', correosAprendices)
        content = content.replace('*FichaCompleta*', numeroFicha)
        content = content.replace('*ProgCompleto*', programaFicha)
        content = content.replace('*Instructor*', nombresInstructores)
        content = content.replace('3. Incumplir con las actividades de aprendizaje acordadas y los compromisos adquiridos como aprendiz SENA, sin justa causa', descripcionCaso)
        content = content.replace('grave', calificacionCausa)
        content = content.replace(
          '“CAPÍTULO III. DEBERES DEL APRENDIZ SENA. ARTÍCULO 9o. “Se entiende por deber, la obligación legal, social y moral que compromete a la persona a cumplir con determinada actuación, asumiendo con responsabilidad todos sus actos, para propiciar la armonía, el respeto, la integración, el bienestar común, la sana convivencia, el servicio a los demás, la seguridad de las personas y de los bienes de la institución. Son deberes del aprendiz SENA durante el proceso de ejecución de la formación, los siguientes: 1. Cumplir con todas las actividades propias de su proceso de aprendizaje o del plan de mejoramiento, definidas durante su etapa lectiva y productiva. 13. Conocer y asumir las políticas y directrices institucionales establecidas, así como el Reglamento del Aprendiz SENA, y convivir en comunidad de acuerdo con ellos. CAPITULO IV PROHIBICIONES. ARTÍCULO 10. Se consideran prohibiciones para los aprendices del SENA',
          faltas
        )

        /* FORMATO DE ACTAS */
        // Reemplazar el marcador con la cadena de texto para el formato de las actas
        const userData = [...usuarios, ...aprendices]

        /* Generamos las filas a insertar con los datos de los usuarios */
        const insertRow = userData.map(
          (dataUser, index) => `
          <tr style="height: 60.2pt">
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 25.6pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 700; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal">${index + 1}</span></p>
            </td>
            <td style="border-right-style: solid; padding: 0pt 5.8pt 0pt 5.8pt; border-bottom-color: #000000; border-top-width: 1pt; border-right-width: 1pt; border-left-color: #000000; vertical-align: top; border-right-color: #000000; border-left-width: 1pt; border-top-style: solid; border-left-style: solid; border-bottom-width: 1pt; width: 81.8pt; border-top-color: #e90505; border-bottom-style: solid; padding-top: 10px; font-size: 14pt;" colspan="1" rowspan="1">
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal">${
                dataUser.nombres + ' ' + dataUser.apellidos
              }</span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 59.5pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal">${dataUser.numeroDocumento}</span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 31.9pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 700; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal"></span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 70.5pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 700; text-decoration: none; vertical-align: baseline; font-size: 12pt; font-family: 'Times New Roman'; font-style: normal"></span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 38.4pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal"></span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 76.8pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal"></span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 83.3pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal">${dataUser.emailSena}</span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 64pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 10pt; font-family: 'Times New Roman'; font-style: normal">${dataUser.celular}</span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 76.8pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 12pt; font-family: 'Times New Roman'; font-style: normal">X</span></p>
            </td>
            <td
              style="border-right-style: solid;padding: 0pt 5.8pt 0pt 5.8pt;border-bottom-color: #000000;border-top-width: 1pt;border-right-width: 1pt;border-left-color: #000000;vertical-align: middle;border-right-color: #000000;border-left-width: 1pt;border-top-style: solid;border-left-style: solid;border-bottom-width: 1pt;width: 96.3pt;border-top-color: #000000;border-bottom-style: solid;
              "
              colspan="1"
              rowspan="1"
            >
              <p style="margin: 0; color: #000000; font-size: 12pt; font-family: 'Times New Roman'; padding-top: 0pt; padding-bottom: 0pt; line-height: 1; text-align: center; height: 12pt"><span style="color: #000000; font-weight: 400; text-decoration: none; vertical-align: baseline; font-size: 12pt; font-family: 'Times New Roman'; font-style: normal"></span></p>
            </td>
          </tr>
        `
        )
        /* Insertamos las filas generadas reemplazandolas por contenido de la plantilla seleccionada */
        content = content.replace('<!-- FILAS A INSERTAR -->', insertRow)

        /* Pasamos el valor a un estado para renderizarlo en el tinyEDITOR */
        setValuefile(content)
      }
    }

    onFileUpload()
  }, [selectedFile, aprendices])

  // ...

  // Funcion para descargar las evidencias
  const fileDownload = async () => {
    try {
      const response = await downloadFile(archivoNombre)
      // Crear un objeto Blob con el contenido del archivo
      const blob = response.data

      // Crear una URL de objeto (Object URL) para el Blob
      const url = window.URL.createObjectURL(blob)

      // Crear un enlace (link) en el DOM para descargar el archivo
      const a = document.createElement('a')
      a.href = url
      a.download = archivoNombre // Asigna el nombre del archivo
      a.click()

      // Liberar la URL de objeto (Object URL) cuando ya no sea necesaria
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error al descargar el archivo'
      })
    }
  }

  const getElementsByRole = () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    let rolToken = information.id_rol

    // Mapear los ID de rol a nombres de rol
    if (rolToken === 1) rolToken = 'Coordinador'
    if (rolToken === 2) rolToken = 'Instructor'
    if (rolToken === 3) rolToken = 'Administrador'

    return {
      adminCoordi: rolToken === 'Administrador' || rolToken === 'Coordinador',
      administration: rolToken === 'Administrador',
      coordination: rolToken === 'Coordinador',
      instructor: rolToken === 'Instructor'
    }
  }

  // Obtener los elementos que se deben mostrar según el rol
  const elements = getElementsByRole()

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center">
        <section className={`bg-white ${modalCitation ? 'w-auto h-auto' : 'w-[35rem]'} p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in `}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl" id="solicitud-label">
              <i className="fi fi-rr-file-circle-info text-gray-500 px-3"></i>Detalle de solicitud
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          {modalCitation ? (
            <section className="mt-5 ">
              <aside className="grid grid-cols-2 ">
                <section>
                  <select onChange={handleSelectChange} className="mb-2 border border-black p-2 rounded-lg">
                    <option value="">Ninguno</option>
                    <option value={actFormat}>Plantilla del formato de Actas</option>
                    <option value={summonsLetter}>Carta de citación a comité de evaluación y seguimiento</option>
                  </select>
                </section>
                <section>
                  <h1>
                    <strong>Nota: </strong>
                    Recuerde modificar y revisar el documento antes de ser exportado.
                    <br />
                    <strong>- </strong>Para exportar el documento dele click a "file",
                    <br />
                    luego a "print" y seleccione el destino como PDF.
                  </h1>
                </section>
              </aside>
              <section>
                <TinyEditor template={!valueFile ? '<h2><strong>Seleccione un archivo y podrás visualizarlo aquí.</strong></h2>' : valueFile} onContentChange={setValuefile} minH={460} maxH={460} width={1200} />
              </section>
            </section>
          ) : (
            <section className="relative top-[1.6rem] ">
              <section className="  place-items-center gap-4 flex justify-between">
                <Button className={getStatusColorClass(estado ? estado[0] : '')}>{estado}</Button>
                <section>
                  <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" value={formatDate(fechaCreacion)} />
                </section>
              </section>
              <section className="relative py-[1.5rem]">
                <Accordion isCompact variant="bordered" aria-label="informacion en general de toda la solicitud">
                  <AccordionItem startContent={<i className="fi fi-rr-user text-purple-500"></i>} title="Información del/los instructor/es" aria-label="Información del instructor">
                    <Table aria-label="Datos de Usuarios">
                      <TableHeader
                        columns={[
                          { key: 'nombre', label: 'Nombre/s' },
                          { key: 'apellidos', label: 'Apellidos' },
                          { key: 'tipoDocumento', label: 'Tipo de Documento' },
                          { key: 'numeroDocumento', label: 'Número de Documento' },
                          { key: 'emailSena', label: 'Correo institucional' },
                          { key: 'emailPersonal', label: 'Correo Personal' },
                          { key: 'celular', label: 'Número de celular' },
                          { key: 'fijo', label: 'Teléfono Fijo' }
                        ]}
                      >
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                      </TableHeader>
                      <TableBody items={usuarios}>
                        {(item) => (
                          <TableRow key={item.numeroDocumento}>
                            <TableCell>{item.nombres}</TableCell>
                            <TableCell>{item.apellidos}</TableCell>
                            <TableCell>{item.tipoDocumento}</TableCell>
                            <TableCell>{item.numeroDocumento}</TableCell>
                            <TableCell>{item.emailSena}</TableCell>
                            <TableCell>{!item.emailPersonal ? 'No disponible' : item.emailPersonal}</TableCell>
                            <TableCell>{item.celular}</TableCell>
                            <TableCell>{!item.fijo ? 'No disponible' : item.fijo}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </AccordionItem>
                  <AccordionItem startContent={<i className="fi fi-rs-book-alt text-red-500"></i>} title="Información del aprendiz" aria-label="Información del aprendiz">
                    <Table aria-label="Datos de Aprendices">
                      <TableHeader
                        columns={[
                          { key: 'nombre', label: 'Nombre/s' },
                          { key: 'apellidos', label: 'Apellidos' },
                          { key: 'tipoDocumento', label: 'Tipo de Documento' },
                          { key: 'numeroDocumento', label: 'Número de Documento' },
                          { key: 'emailSena', label: 'Correo institucional' },
                          { key: 'emailPersonal', label: 'Correo Personal' },
                          { key: 'celular', label: 'Número de celular' },
                          { key: 'fijo', label: 'Teléfono Fijo' },
                          { key: 'numeroFicha', label: 'Número de Ficha' },
                          { key: 'nombreProgramaFicha', label: 'Nombre del Programa de Ficha' }
                        ]}
                      >
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                      </TableHeader>
                      <TableBody items={aprendices}>
                        {(item) => (
                          <TableRow key={item.numeroDocumento}>
                            <TableCell>{item.nombres}</TableCell>
                            <TableCell>{item.apellidos}</TableCell>
                            <TableCell>{item.tipoDocumento}</TableCell>
                            <TableCell>{item.numeroDocumento}</TableCell>
                            <TableCell>{item.emailSena}</TableCell>
                            <TableCell>{!item.emailPersonal ? 'No disponible' : item.emailPersonal}</TableCell>
                            <TableCell>{item.celular}</TableCell>
                            <TableCell>{!item.fijo ? 'No disponible' : item.fijo}</TableCell>
                            <TableCell>{item.numeroFicha}</TableCell>
                            <TableCell>{item.nombreProgramaFicha}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </AccordionItem>
                  <AccordionItem aria-labelledby="solicitud-label" startContent={<i className="fi fi-sr-clip text-blue-500"></i>} title="Información de la solicitud">
                    <section className="grid grid-cols-2 gap-x-7 gap-y-2 pr-[1rem] max-h-[200px] overflow-auto">
                      <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="Tipo solicitud" defaultValue={tipoSolicitud} isReadOnly />
                      </section>
                      <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="nombre del/la coordinador/a" defaultValue={nombreCoordinacion} isReadOnly />
                      </section>
                      <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="Categoría causa" defaultValue={categoriaCausa} isReadOnly />
                      </section>
                      <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="Calificación causa" defaultValue={calificacionCausa} isReadOnly />
                      </section>
                      <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="Artículo" defaultValue={numeroArticulo} isReadOnly />
                      </section>
                      <section className="flex flex-wrap mt-4 md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Button variant="bordered" color="primary" onClick={fileDownload}>
                          Descargar evidencias
                        </Button>
                      </section>
                      <section>
                        <Popover placement="top-end" size="lg" backdrop="opaque" showArrow>
                          <PopoverTrigger>
                            <Button color="primary" variant="flat">
                              Numerales infringidos
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              {numerales.map((numeral) => (
                                <div key={numeral.numero}>
                                  <strong> {TituloCapitulo}</strong> <br />
                                  <strong>Numeral:</strong> {numeral.numero}
                                  <br />
                                  <strong>Descripción del numeral:</strong> {numeral.descripcion}
                                  <hr />
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </section>
                      <section>
                        <Popover placement="top-end" size="lg" backdrop="opaque" showArrow>
                          <PopoverTrigger className="w-full">
                            <Button color="primary" variant="flat">
                              Descripción caso
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <section className="px-1 py-2">
                              <section>
                                <p>{descripcionCaso}</p>
                              </section>
                            </section>
                          </PopoverContent>
                        </Popover>
                      </section>
                    </section>
                  </AccordionItem>
                </Accordion>
              </section>
            </section>
          )}
          {elements.adminCoordi && (
            <Button className="w-full mt-5" variant="bordered" onClick={generateCitationModal}>
              {modalCitation ? 'Ver datos de la solicitud' : 'Generar documentación de la solicitud'}
            </Button>
          )}
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
