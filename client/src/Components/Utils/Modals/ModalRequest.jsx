import { Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Input, Button, Pagination } from '@nextui-org/react'
import { useState, useEffect } from 'react'

import { getRequestById } from '../../../api/httpRequest'

export const ModalRequest = ({ cerrarModal, requestID }) => {
  /* estados para almacenar los datos de los aprendices involucrados */
  const [nombresAprendices, setNombresAprendices] = useState(null)
  const [apellidosAprendices, setApellidosAprendices] = useState(null)
  const [tipoDocumentoAprendices, setTipoDocumentoAprendices] = useState(null)
  const [numeroDocumentoAprendices, setnumeroDocumentoAprendices] = useState(null)
  const [correoSenaAprendices, setCorreoSenaAprendices] = useState(null)
  const [numeroCelularAprendices, setNumeroCelularAprendices] = useState(null)
  const [numeroFichaAprendices, setNumeroFichaAprendices] = useState(null)
  const [nombreProgramaAprendices, setNombreProgramaAprendices] = useState(null)

  /* estados para almacenar los datos de los usuarios involucrados */
  const [nombresUsuarios, setNombresUsuarios] = useState(null)
  const [apellidosUsuarios, setApellidosUsuarios] = useState(null)
  const [tipoDocumentoUsuarios, setTipoDocumentoUsuarios] = useState(null)
  const [numeroDocumentoUsuarios, setnumeroDocumentoUsuarios] = useState(null)
  const [correoSenaUsuarios, setCorreoSenaUsuarios] = useState(null)
  const [numeroCelularUsuarios, setNumeroCelularUsuarios] = useState(null)

  /* estados para almacenar los datos de la solicitud */
  const [tipoSolicitud, setTipoSolicitud] = useState(null)
  const [nombreCoordinacion, setNombreCoordinacion] = useState(null)
  const [estado, setEstado] = useState(null)
  const [categoriaCausa, setCategoriaCausa] = useState(null)
  const [calificacionCausa, setCalificacionCausa] = useState(null)
  const [descripcionCaso, setDescripcionCaso] = useState(null)

  /* estados para almacenar los datos de las infracciones */
  const [numeroArticulo, setNumeroArticulo] = useState(null)
  const [numeroNumeral, setNumeroNumeral] = useState(null)
  const [descripcionNumeral, setDescripcionNumeral] = useState(null)

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

      // Convertir los objetos únicos de nuevo a objetos JSON de los aprendices
      const nombresAprendiz = [...new Set(datosUnicosArray.map((item) => item.nombres_aprendices))]
      const ApellidosAprendiz = [...new Set(datosUnicosArray.map((item) => item.apellidos_aprendices))]
      const TipoDocumentoAprendiz = [...new Set(datosUnicosArray.map((item) => item.tipo_documento_aprendiz))]
      const NumeroDocumentoAprendiz = [...new Set(datosUnicosArray.map((item) => item.numero_documento_aprendiz))]
      const emailSenaAprendiz = [...new Set(datosUnicosArray.map((item) => item.email_aprendiz_sena))]
      const numeroCelularAprendiz = [...new Set(datosUnicosArray.map((item) => item.celular_aprendiz))]
      const fichaAprendiz = [...new Set(datosUnicosArray.map((item) => item.numero_ficha))]
      const nombreProgramaAprendiz = [...new Set(datosUnicosArray.map((item) => item.nombre_programa_ficha))]

      // Convertir los objetos únicos de nuevo a objetos JSON de los usuarios
      const nombresUsuarios = [...new Set(datosUnicosArray.map((item) => item.nombre_usuario_solicitante))]
      const apellidosUsuarios = [...new Set(datosUnicosArray.map((item) => item.apellidos_usuario_solicitante))]
      const TipoDocumentoUsuarios = [...new Set(datosUnicosArray.map((item) => item.tipo_documento_solicitante))]
      const NumeroDocumentoUsuarios = [...new Set(datosUnicosArray.map((item) => item.numero_documento_usuario_solicitante))]
      const emailSenaUsuarios = [...new Set(datosUnicosArray.map((item) => item.email_sena_usuario_solicitante))]
      const numeroCelularUsuarios = [...new Set(datosUnicosArray.map((item) => item.numero_celular_usuario_solicitante))]

      // Convertir los objetos únicos de nuevo a objetos JSON de la solicitud
      const tipoSolicitud = [...new Set(datosUnicosArray.map((item) => item.tipo_solicitud))]
      const nombreCoordinacion = [...new Set(datosUnicosArray.map((item) => item.nombre_coordinacion))]
      const estado = [...new Set(datosUnicosArray.map((item) => item.estado))]
      const categoriaCausa = [...new Set(datosUnicosArray.map((item) => item.categoria_causa))]
      const calificacionCausa = [...new Set(datosUnicosArray.map((item) => item.calificacion_causa))]
      const descripcionCaso = [...new Set(datosUnicosArray.map((item) => item.descripcion_caso))]

      // Convertir los objetos únicos de nuevo a objetos JSON de las infracciones
      const numeroArticulo = [...new Set(datosUnicosArray.map((item) => item.numero_articulo))]
      const numeroNumeral = [...new Set(datosUnicosArray.map((item) => item.numero_numeral))]
      const descripcionNumeral = [...new Set(datosUnicosArray.map((item) => item.descripcion_numeral))]

      /* Datos de los aprendices involucrados */
      setNombresAprendices(nombresAprendiz)
      setApellidosAprendices(ApellidosAprendiz)
      setTipoDocumentoAprendices(TipoDocumentoAprendiz)
      setnumeroDocumentoAprendices(NumeroDocumentoAprendiz)
      setCorreoSenaAprendices(emailSenaAprendiz)
      setNumeroCelularAprendices(numeroCelularAprendiz)
      setNumeroFichaAprendices(fichaAprendiz)
      setNombreProgramaAprendices(nombreProgramaAprendiz)

      /* Datos de los usuarios involucrados */
      setNombresUsuarios(nombresUsuarios)
      setApellidosUsuarios(apellidosUsuarios)
      setTipoDocumentoUsuarios(TipoDocumentoUsuarios)
      setnumeroDocumentoUsuarios(NumeroDocumentoUsuarios)
      setCorreoSenaUsuarios(emailSenaUsuarios)
      setNumeroCelularUsuarios(numeroCelularUsuarios)

      /* Datos de la solicitud */
      setTipoSolicitud(tipoSolicitud)
      setNombreCoordinacion(nombreCoordinacion)
      setEstado(estado)
      setCategoriaCausa(categoriaCausa)
      setCalificacionCausa(calificacionCausa)
      setDescripcionCaso(descripcionCaso)

      /* Datos de las infracciones */
      setNumeroArticulo(numeroArticulo)
      setNumeroNumeral(numeroNumeral)
      setDescripcionNumeral(descripcionNumeral)
    } catch (error) {
      console.log(error)
    }
  }

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  // const getStatusColorClass = (status) => {
  //   const statusColorMap = {
  //     Aprobado: 'bg-green-200 text-success rounded-2xl', // Clase CSS para aprobado
  //     Rechazado: 'bg-red-200 text-danger rounded-2xl' // Clase CSS para rechazado
  //   }
  //   return statusColorMap[status] || 'text-black' // Clase CSS por defecto (negro) si el estado no está en el mapa
  // }

  return (
    <>
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center">
        <section className={`bg-white w-[35rem] p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in `}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl">
              <i className="fi fi-rr-file-circle-info text-gray-500 px-3"></i>Detalle de solicitud
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>

          <section className="relative top-[1.6rem] ">
            <section className="  place-items-center gap-4 flex justify-between">
              <Button>{estado}</Button>
              <section>
                <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
              </section>
            </section>
            <section className="relative py-[1.5rem]">
              <Accordion isCompact variant="bordered">
                <AccordionItem  startContent={<i className="fi fi-rr-user text-purple-500"></i>} title="Información del/los instructor/es">
                  <section className="grid-cols-1 gap-x-3 gap-y-2  grid max-h-[200px]  overflow-auto">
                    <form action="">
                      <section className="w-full">
                        <label htmlFor="nombre" className="text-[13px] block">
                          Nombre/s
                          <input type="text" id="nombre" value={nombresUsuarios} readOnly className="bg-[#80808036]  text-zinc-500 w-full shadow-sm px-[12px]  text-small  rounded-medium h-unit-10 outline-none block " />
                        </label>
                      </section>
                      <section className="w-full">
                        <label htmlFor="apellido" className="text-[13px] block">
                          Apellido/s
                          <input type="text" id="apellido" value={apellidosUsuarios} readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                        </label>
                      </section>
                      <section className="w-full">
                        <label htmlFor="tipo" className="text-[13px] block">
                          Tipo de documento
                          <input type="text" id="tipo" value={tipoDocumentoUsuarios} readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                        </label>
                      </section>
                      <section className="w-full">
                        <label htmlFor="documento" className="text-[13px] block">
                          Número de documento/s
                          <input type="text" id="docuemento" value={numeroDocumentoUsuarios} readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                        </label>
                      </section>
                      <section className="w-full">
                        <label htmlFor="email" className="text-[13px] block">
                          Correo/s institucional/es
                          <input type="email" id="email" value={correoSenaUsuarios} readOnly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                        </label>
                      </section>
                      <section className="w-full">
                        <label htmlFor="number" className="text-[13px] block">
                          Número/s de contacto
                          <input type="text" id="number" value={numeroCelularUsuarios} readOnly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                        </label>
                      </section>
                    </form>
                  </section>
                </AccordionItem>
                <AccordionItem  startContent={<i className="fi fi-rs-book-alt text-red-500"></i>} title="Información del aprendiz">
                  <section className="grid grid-cols-1 gap-x-7 gap-y-2 max-h-[200px] overflow-auto pr-[1rem] ">
                    <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Nombre" defaultValue={nombresAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Apellido" defaultValue={apellidosAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Tipo  documento" defaultValue={tipoDocumentoAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Documento" defaultValue={numeroDocumentoAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Correo" defaultValue={correoSenaAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Número" defaultValue={numeroCelularAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Ficha" defaultValue={numeroFichaAprendices} isReadOnly />
                    </section>
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Programa" defaultValue={nombreProgramaAprendices} isReadOnly />
                    </section>
                  </section>
                </AccordionItem>
                <AccordionItem  startContent={<i className="fi fi-sr-clip text-blue-500"></i>} title="Información de la solicitud">
                  <section className="grid grid-cols-2 gap-x-7 gap-y-2 pr-[1rem] max-h-[200px] overflow-auto">
                    <section className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Tipo solicitud" defaultValue={tipoSolicitud} isReadOnly />
                    </section>
                    <section className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Coordinador" defaultValue={nombreCoordinacion} isReadOnly />
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
                      <Input type="text" variant="underlined" label="Evidencias" defaultValue="Descargar" isReadOnly />
                    </section>
                    <section className="flex pt-[1rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Popover
                        showArrow
                        backdrop="opaque"
                        placement="top"
                        classNames={{
                          base: 'py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
                          arrow: 'bg-default-200'
                        }}
                      >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat">
                            Numerales infringidos
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <section className="px-1 py-2">
                            <section className="text-sm w-[10rem]">
                              <p>{descripcionNumeral}</p>
                            </section>
                          </section>
                        </PopoverContent>
                      </Popover>
                    </section>
                    <section className="flex  pt-[1rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Popover
                        showArrow
                        backdrop="opaque"
                        placement="top"
                        classNames={{
                          base: 'py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
                          arrow: 'bg-default-200'
                        }}
                      >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat">
                            Descripción caso
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <section className="px-1 py-2">
                            <section className="text-sm w-[10rem]">
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
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
