import { Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'

import { getRequestById } from '../../../api/httpRequest'

import { format } from 'date-fns' // Importar biblioteca para formatear las fechas
import { TinyEditor } from '../tinyEditor/TinyEditor'
import mammoth from 'mammoth'

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
  const [archivoID, setArchivoId] = useState(null)

  /* estados para almacenar los datos de las infracciones */
  const [numeroArticulo, setNumeroArticulo] = useState(null)
  const [numerales, setNumerales] = useState([])

  const [modalCitation, setModalCitation] = useState(false)
  const [file, setFile] = useState(null)
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
            nombre: item.nombre_usuario_solicitante,
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

      console.log(res)

      // Convertir los objetos únicos de nuevo a objetos JSON de la solicitud
      const tipoSolicitud = [...new Set(datosUnicosArray.map((item) => item.tipo_solicitud))]
      const nombreCoordinacion = [...new Set(datosUnicosArray.map((item) => item.nombre_coordinacion))]
      const estado = [...new Set(datosUnicosArray.map((item) => item.estado))]
      const categoriaCausa = [...new Set(datosUnicosArray.map((item) => item.categoria_causa))]
      const calificacionCausa = [...new Set(datosUnicosArray.map((item) => item.calificacion_causa))]
      const descripcionCaso = [...new Set(datosUnicosArray.map((item) => item.descripcion_caso))]
      const tituloCapitulo = [...new Set(datosUnicosArray.map((item) => item.titulo_capitulo))]
      const fechaCreacion = [...new Set(datosUnicosArray.map((item) => item.fecha_creacion))]
      const idArchivo = [...new Set(datosUnicosArray.map((item) => item.id_archivo_solicitud))]

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
      setArchivoId(idArchivo)

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

  const generateCitationModal = () => {
    setModalCitation(!modalCitation)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  // ...

  useEffect(() => {
    const onFileUpload = async () => {
      if (file) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result

          try {
            const result = await mammoth.convertToHtml({ arrayBuffer })
            let content = result.value

            // Construir una cadena de nombres de aprendices
            const nombresAprendices = aprendices.map((aprendiz) => aprendiz.nombres + ' ' + aprendiz.apellidos).join(', ')
            const correosAprendices = aprendices.map((aprendiz) => aprendiz.emailSena).join(', ')
            const numeroFicha = aprendices.map((aprendiz) => aprendiz.numeroFicha).join(', ')
            const programaFicha = aprendices.map((aprendiz) => aprendiz.nombreProgramaFicha).join(', ')

            const nombresInstructores = usuarios.map((usuarios) => usuarios.nombre + ' ' + usuarios.apellidos).join(', ')
            const faltas = numerales.map((numerales) => TituloCapitulo + numeroArticulo + `${numerales.numero}` + '. ' + numerales.descripcion).join(', ')

            // Reemplazar el marcador con la cadena de nombres
            content = content.replace('*NombreAprendiz*', nombresAprendices)
            content = content.replace('*CorreoElectronico*', correosAprendices)
            content = content.replace('*FichaCompleta*', numeroFicha)
            content = content.replace('*ProgCompleto*', programaFicha)
            content = content.replace('*Instructor*', nombresInstructores)
            content = content.replace(
              '“CAPÍTULO III. DEBERES DEL APRENDIZ SENA. ARTÍCULO 9o. “Se entiende por deber, la obligación legal, social y moral que compromete a la persona a cumplir con determinada actuación, asumiendo con responsabilidad todos sus actos, para propiciar la armonía, el respeto, la integración, el bienestar común, la sana convivencia, el servicio a los demás, la seguridad de las personas y de los bienes de la institución. Son deberes del aprendiz SENA durante el proceso de ejecución de la formación, los siguientes: 1. Cumplir con todas las actividades propias de su proceso de aprendizaje o del plan de mejoramiento, definidas durante su etapa lectiva y productiva. 13. Conocer y asumir las políticas y directrices institucionales establecidas, así como el Reglamento del Aprendiz SENA, y convivir en comunidad de acuerdo con ellos. CAPITULO IV PROHIBICIONES. ARTÍCULO 10. Se consideran prohibiciones para los aprendices del SENA',
              faltas
            )

            setValuefile(content)
          } catch (error) {
            console.error('Error al procesar el archivo Word', error)
          }
        }
        reader.readAsArrayBuffer(file)
      }
    }

    onFileUpload()
  }, [file, aprendices])

  // ...

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center">
        <section className={`bg-white ${modalCitation ? 'w-[85rem] h-[45rem]' : 'w-[35rem]'} p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in `}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl" id="solicitud-label">
              <i className="fi fi-rr-file-circle-info text-gray-500 px-3"></i>Detalle de solicitud
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          {modalCitation ? (
            <section className="grid grid-cols-2 gap-2 mt-5">
              <section className=" flex flex-col items-center justify-center">
                <section className="flex w-[33rem] text-gray-500 gap-2 mb-2">
                  <strong>Nota: </strong>
                  <p> Debe seleccionar el archivo de la carta de citación a comité de evaluación y seguimiento y transcribir el texto al archivo original.</p>
                </section>
                <label htmlFor="upload" className="w-[80%] flex flex-col items-center justify-center gap-2 p-10 cursor-pointer bg-white rounded-md border border-blue-600 shadow-md">
                  <i className="fi fi-rr-add-document text-blue-600 text-3xl" />
                  <span className="text-gray-600 font-se">{file ? `Archivo seleccionado: ${file.name}` : 'Subir archivo'}</span>
                </label>
                <input id="upload" type="file" className="hidden" onChange={handleFileChange} />
              </section>
              <section>
                <TinyEditor template={!valueFile ? '<h2><strong>Seleccione un archivo y podrás visualizarlo aquí.</strong></h2>' : valueFile} onContentChange={setValuefile} />
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
                            <TableCell>{item.nombre}</TableCell>
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
                      <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant="underlined" label="Evidencias" defaultValue={archivoID} isReadOnly />
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

          <Button className="w-full mt-5" variant="bordered" onClick={generateCitationModal}>
            {modalCitation ? 'Ver datos de la solicitud' : 'Generar carta de citación'}
          </Button>
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
