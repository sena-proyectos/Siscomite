import { useEffect, useState } from 'react'
import { downloadFile, getApprenticesById, getFileByApprentice } from '../../../api/httpRequest'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { Toaster, toast } from 'sonner'
import { format } from 'date-fns' // Importar biblioteca para formatear las fechas
import { elements } from '../../Sliderbar/Sliderbar' 

export const ModalInfoStudents = ({ cerrarModal, idStudents }) => {
  // Estado para almacenar los datos del estudiante.
  const [dataInfoStudent, setDataInfoStudent] = useState([])
  const [file, setFiles] = useState([])
  const [viewFile, setViewFile] = useState(false)

  useEffect(() => {
    // Función asincrónica para obtener información del estudiante por su ID.
    const infoStudent = async () => {
      try {
        const response = await getApprenticesById(idStudents)
        const res = response.data.result

        // Mapear los valores del tipo de documento a nombres descriptivos.
        if (res[0].id_documento === 1) res[0].id_documento = 'CC'
        if (res[0].id_documento === 2) res[0].id_documento = 'CE'
        if (res[0].id_documento === 3) res[0].id_documento = 'TI'
        if (res[0].id_documento === 4) res[0].id_documento = 'PEP'
        if (res[0].id_documento === 5) res[0].id_documento = 'Registro Civil'

        // Actualizar el estado con los datos del estudiante.
        setDataInfoStudent(res)
      } catch (error) {}
    }
    infoStudent()
  }, [])

  // Función para cerrar el modal.
  const closeModal = () => {
    cerrarModal()
  }

  const viewFileFunction = () => {
    setViewFile(!viewFile)
  }

  useEffect(() => {
    // Función asincrónica para obtener información del estudiante por su ID.
    const filesByApprentices = async () => {
      try {
        const response = await getFileByApprentice(idStudents)
        const res = response.data.result

        // Actualizar el estado con los datos del estudiante.
        setFiles(res)
      } catch (error) {
        const message = error?.response?.data?.message
      }
    }
    filesByApprentices()
  }, [])

  const fileDownload = async (nameFile) => {
    try {
      const response = await downloadFile(nameFile)

      // Crear un objeto Blob con el contenido del archivo
      const blob = response.data

      // Crear una URL de objeto (Object URL) para el Blob
      const url = window.URL.createObjectURL(blob)

      // Crear un enlace (link) en el DOM para descargar el archivo
      const a = document.createElement('a')
      a.href = url
      a.download = nameFile // Asigna el nombre del archivo
      a.click()

      // Liberar la URL de objeto (Object URL) cuando ya no sea necesaria
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error al descargar el archivo'
      })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }

  return (
    <>
      {/* Contenedor del modal */}

      <Toaster position="top-right" closeButton richColors />
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center ">
        <section className={'bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          {/* Encabezado del modal */}
          {viewFile ? (
            <section>
              <Table className="h-full select-none" aria-label="Tabla para ver las solicitudes">
                <TableHeader>
                  <TableColumn aria-label="Número de la solicitud">Nº de la solicitud</TableColumn>
                  <TableColumn aria-label="Nombre del solicitante" className="flex items-center">
                    Nombre del solicitante
                  </TableColumn>
                  <TableColumn aria-label="Tipo de solicitud">Nombre del archivo</TableColumn>
                  <TableColumn aria-label="Fecha de la solicitud">Fecha de la solicitud</TableColumn>
                  <TableColumn aria-label="Descargas">Descargas</TableColumn>
                </TableHeader>

                <TableBody emptyContent={'No existen archivos'}>
                  {file.map((item) => (
                    <TableRow key={item.nombre_archivo}>
                      <TableCell>{item.numero_solicitud}</TableCell>
                      <TableCell>{item.nombres + ' ' + item.apellidos}</TableCell>
                      <TableCell>{item.nombre_archivo.replace(/\d+-/g, '')}</TableCell>
                      <TableCell>{formatDate(item.fecha_creacion_solicitud)}</TableCell>
                      <TableCell className="cursor-pointer" onClick={() => fileDownload(item.nombre_archivo)}>
                        <Chip color="success" variant="flat">
                          <i className="fi fi-rr-cloud-download-alt"></i>
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          ) : (
            <>
              <header className="flex justify-center ">
                <h3 className="text-2xl font-semibold">
                  <i className="fi fi-rs-file-user text-blue-600 px-3"></i>Información
                </h3>
                <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
                  <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
                </section>
              </header>

              {/* Mostrar los datos del estudiante */}
              {dataInfoStudent.map((item) => {
                return (
                  <section className="mt-[1rem] overflow-hidden w-[30rem] min-w-[50%]" key={item.id_aprendiz}>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Nombre completo</span>
                      <p>
                        {item.nombres_aprendiz || 'No especificado'} {item.apellidos_aprendiz || 'No especificado'}
                      </p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Tipo de documento</span>
                      <p>{item.id_documento || 'No especificado'}</p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Número de documento</span>
                      <p>{item.numero_documento_aprendiz || 'No especificado'}</p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Correo institucional</span>
                      <p>{item.email_aprendiz_sena || 'No especificado'}</p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Correo Alterno</span>
                      <p>{item.email_aprendiz_personal || 'No especificado'}</p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Número</span>
                      <p>{item.celular_aprendiz || 'No especificado'}</p>
                    </section>
                    <section className="mt-[10px] border-b-2  border-[#0799b6]">
                      <span className="font-bold text-[17px]">Número alteno</span>
                      <p>{item.fijo_aprendiz || 'No especificado'}</p>
                    </section>
                  </section>
                )
              })}
            </>
          )}

          {elements.adminCoordi && (
            <section className=" flex justify-center">
              <Button className="m-2 w-[20rem]" variant="bordered" color="success" onClick={viewFileFunction}>
                {viewFile ? 'Ver datos del aprendiz' : 'Ver archivos'}
              </Button>
            </section>
          )}
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
