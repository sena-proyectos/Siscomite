// Importaciones necesarias
import './Requests.css' // Importar hoja de estilo CSS
import { useState, useEffect } from 'react' // Importar el hook de estado
import { Sliderbar } from '../Sliderbar/Sliderbar' // Importar el componente Sliderbar
import { Search } from '../Search/Search' // Importar el componente Search
import { Footer } from '../Footer/Footer' // Importar el componente Footer
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Popover, PopoverTrigger, PopoverContent, Button, Divider } from '@nextui-org/react' // Importar componentes de la tabla de Next.js
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge' // Importar el componente Notifybadge para notificaciones
import { ModalEditRequest } from '../Utils/Modals/ModalEditRequest' // Importar el componente ModalEditRequest
import { ModalRequest } from '../Utils/Modals/ModalRequest' // Importar el componente ModalRequest
import { getRequest, getRequestByIdUser, search } from '../../api/httpRequest'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT

import { format } from 'date-fns' // Importar biblioteca para formatear las fechas

import { requestStore } from '../../store/config'
import { Toaster, toast } from 'sonner'
import { ModalGenerateReport } from '../Utils/Modals/ModalGenerateReports'
import DatePicker from 'react-datepicker' // Inporta bibloteca de react para el calendario
import 'react-datepicker/dist/react-datepicker.css' // Estilos del calendario

// Componente Requests
const Requests = () => {
  const [isOpen] = useState(false) // Estado para controlar la apertura de un modal
  const [request, setRequest] = useState([]) // estado para guardar las solicitudes de la base de datos
  const [requestById, setRequestById] = useState([]) // estado para guardar las solicitudes de usuarios de la base de datos
  const [sortOrder, setSortOrder] = useState('asc') // Estado para rastrear el orden de clasificación
  // Paginación
  const itemsPerPage = 8 // Número de elementos por página
  const [activePage, setActivePage] = useState(1) // Estado para mostrar las solicitudes dese la primera página
  const [requestId, setRequestId] = useState(null)
  const [selectedValueDetails, setSelectedValueDetails] = useState('') // Estado para el valor de estado seleccionado
  const [searchValue, setSearchValue] = useState('') // Estado para el valor de búsqueda
  // Agregar un estado para el filtro de estado
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedDate, setSelectedDate] = useState(null) //Estado para seleccionar la fecha seleccionada
  const [highlightedRequestId, setHighlightedRequestId] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)

  // Obtener los elementos que se deben mostrar según el rol
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
      all: rolToken === 'Administrador' || rolToken === 'Coordinador' || rolToken === 'Instructor',
      administration: rolToken === 'Administrador',
      coordination: rolToken === 'Coordinador',
      instructor: rolToken === 'Instructor'
    }
  }

  // Obtener los elementos que se deben mostrar según el rol
  const elements = getElementsByRole()

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = elements.adminCoordi ? (request && request.length > 0 ? request.slice(indexOfFirstItem, indexOfLastItem) : []) : elements.instructor ? (requestById && requestById.length > 0 ? requestById.slice(indexOfFirstItem, indexOfLastItem) : []) : []
  const totalPages = Math.ceil(request && request.length / itemsPerPage)

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  // Obtiene una clase CSS basada en el estado de aprobación
  const getStatusColorClass = (status) => {
    const statusColorMap = {
      Aprobado: 'bg-[#45d48383] text-success rounded-2xl',
      Rechazado: 'bg-red-200 text-danger rounded-2xl'
    }
    return statusColorMap[status] || ''
  }

  // Estado y función para controlar la apertura del modal de detalles
  const [modalRequest, setModalDetails] = useState(false)

  const modalDetails = (id) => {
    setModalDetails(!modalRequest)
    setRequestId(id)
  }

  // Estado y función para controlar la apertura del modal de edición de detalles
  const [modalRequestEdit, setModalDetailsEdit] = useState(false)
  const modalDetailsEdit = (id) => {
    setModalDetailsEdit(!modalRequestEdit)
    setRequestId(id)
  }

  useEffect(() => {
    /* Llamar la funcion de obtener solicitudes */
    getRequets()
    getRequetsById()
  }, [])

  /* Obtener las solicitudes echas */
  const getRequets = async () => {
    try {
      const response = await getRequest()
      const res = response.data.result
      setRequest(res)
      // Busca si hay alguna solicitud en estado "En proceso"
      const hasEnProceso = res.some((item) => item.estado === 'En proceso')
      if (hasEnProceso) {
        setSelectedValueDetails('En proceso')
      }
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error al obtener las solicitudes'
      })
    }
  }

  /* Obtener las solicitudes echas por usuario */
  const getRequetsById = async () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    let userID = information.id_usuario

    try {
      const response = await getRequestByIdUser(userID)
      const res = response.data.result
      setRequestById(res)
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error al obtener las solicitudes'
      })
    }
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }

  const { requestInformation, setRequestInformation } = requestStore()

  useEffect(() => {
    const idSolicitud = requestInformation.id_solicitud

    // Verifica si hay un id_solicitud en el requestInformation antes de aplicar la clase
    if (idSolicitud) {
      setHighlightedRequestId(idSolicitud)

      // Aplica la lógica para resaltar la fila utilizando una referencia al elemento HTML
      const highlightedRow = document.getElementById(`row-${idSolicitud}`)
      if (highlightedRow) {
        highlightedRow.classList.add('highlighted-row')

        // Elimina el valor id_solicitud del estado después de usarlo
      }
      setRequestInformation({ id_solicitud: null })
    }
  }, [requestInformation])

  // ---------------- Filtros --------------------
  // Crear una función para filtrar las solicitudes por estado
  const filterByStatus = (status) => {
    // Obtén el rol del usuario
    const userRole = getElementsByRole()
    if (userRole.adminCoordi) {
      // Realizar el filtrado basado en la variable request
      const filteredRequests = request.filter((item) => {
        return item.estado.toLowerCase() === status.toLowerCase()
      })
      setRequest(filteredRequests)
    } else if (userRole.instructor) {
      // Realizar el filtrado basado en la variable requestById
      const filteredRequests = requestById.filter((item) => {
        return item.estado.toLowerCase() === status.toLowerCase()
      })
      setRequestById(filteredRequests)
    }
  }

  // Función para manejar la búsqueda de solicitudes por nombre
  const filterNames = (searchValue) => {
    setSearchValue(searchValue)

    if (!searchValue) {
      getRequets()
      getRequetsById()
    } else {
      // Filtrar usuarios por nombre y apellido
      const filteredRequests = request.filter((item) => {
        const nombre = item.nombres.toLowerCase().toUpperCase().includes(searchValue.toLowerCase().toUpperCase())
        const apellido = item.apellidos.toLowerCase().toUpperCase().includes(searchValue.toLowerCase().toUpperCase())

        return nombre || apellido
      })

      setRequest(filteredRequests)
    }
  }

  const modalReport = () => {
    setModalOpen(!modalOpen)
  }

  // Función para manejar el cambio de fecha
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const userRole = getElementsByRole()
    if (date) {
      if (userRole.adminCoordi) {
        // Realizar la búsqueda basada en la variable request
        const filteredRequests = request.filter((item) => {
          const requestDateAdmincoordi = new Date(item.fecha_creacion)
          return requestDateAdmincoordi.toDateString() === date.toDateString()
        })
        setRequest(filteredRequests)
      } else if (userRole.instructor) {
        // Realizar la búsqueda basada en la variable requestById
        const filteredRequests = requestById.filter((item) => {
          const requestDateInstructor = new Date(item.fecha_creacion)
          return requestDateInstructor.toDateString() === date.toDateString()
        })
        setRequestById(filteredRequests)
      }
    } else {
      if (userRole.adminCoordi) {
        setRequest(request)
      } else if (userRole.instructor) {
        setRequestById(requestById)
      }
    }
  }

  // Función para ordenar la lista de solicitudes por nombre
  const sortRequestsByName = () => {
    const sortedRequests = [...request]
    sortedRequests.sort((a, b) => {
      const nameA = `${a.nombres} ${a.apellidos}`.toLowerCase()
      const nameB = `${b.nombres} ${b.apellidos}`.toLowerCase()
      if (sortOrder === 'asc') {
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
      } else {
        if (nameA > nameB) return -1
        if (nameA < nameB) return 1
      }
      return 0
    })

    // Cambiar el orden de clasificación para la próxima vez
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')

    setRequest(sortedRequests)
  }

  // Función para eliminar el filtro
  const clearFilter = () => {
    setSelectedStatus('')
    // Vuelve a obtener todas las solicitudes
    getRequets()
    getRequetsById()
  }

  const clearFilterDate = () => {
    setSelectedDate('')
    // Vuelve a obtener todas las solicitudes
    getRequets()
    getRequetsById()
  }

  return (
    <>
      {modalRequest && <ModalRequest modalDetails={isOpen} cerrarModal={modalDetails} requestID={requestId} />}
      {modalRequestEdit && <ModalEditRequest modalDetailsEdit={isOpen} cerrarModal={modalDetailsEdit} requestID={requestId} reloadFetch={getRequets} fetchById={getRequetsById} />}

      <main className="h-screen flex">
        <Sliderbar />
        <Toaster position="top-right" closeButton richColors />
        <section className="w-full overflow-auto ">
          <header className="px-[1.5rem] pt-[1.5rem] pb-[.5rem]">
            <section className="grid grid-cols-3 place-items-end">
              <section className="w-[60%] col-span-2 right-0 relative">
                <Search placeholder={'Buscar solicitud'} icon={<i className="fi fi-br-search relative right-[3rem] " />} searchUser={filterNames} searchValue={searchValue} dateArray={request} />
              </section>
              <section className="w-full h-full flex justify-center items-center">
                <NotifyBadge />
              </section>
            </section>
            <section className="px-[.5rem] mt-5 flex">
              <DatePicker selected={selectedDate} onChange={(date) => handleDateSelect(date)} showIcon icon="fi fi-rr-calendar-pen" dateFormat="dd/MM/yyyy" isClearable placeholderText="Seleccionar fecha" className="cursor-pointer border-2 border-primary px-5 py-[5px] text-sm rounded-lg outline-none h-[2.5rem]" />
              <Button color="primary" variant="light" onClick={clearFilterDate}>
                <i className="fi fi-rr-eraser " />
                Limpiar fecha
              </Button>
            </section>
          </header>

          <section className="px-[2rem] relative mr-auto h-[65vh]">
            <Table className="h-full select-none" aria-label="Tabla para ver las solicitudes">
              <TableHeader>
                <TableColumn aria-label="Número de la solicitud">Número de la solicitud</TableColumn>
                <TableColumn aria-label="Nombre del solicitante" className="flex items-center">
                  Nombre del solicitante
                  {elements.adminCoordi && (
                    <span onClick={sortRequestsByName} className="ml-2 hover:bg-default-500 hover:text-white text-[16px] p-2 rounded-full flex items-center">
                      {sortOrder === 'asc' ? <i className="fi fi-rr-sort-alpha-up cursor-pointer" /> : <i className="fi fi-sr-sort-alpha-down-alt cursor-pointer" />}
                    </span>
                  )}
                </TableColumn>
                <TableColumn aria-label="Fecha de la solicitud">Fecha de la solicitud</TableColumn>
                <TableColumn aria-label="Tipo de solicitud">Tipo de solicitud</TableColumn>
                <TableColumn aria-label="Estado" className="flex items-center gap-x-4">
                  Estado
                  <Popover placement="right">
                    <PopoverTrigger>
                      <section className="w-4 cursor-pointer">
                        <i className="fi fi-br-menu-dots-vertical text-sm" />
                      </section>
                    </PopoverTrigger>
                    <PopoverContent>
                      <section className="px-1 py-2 flex flex-col gap-4">
                        <p className="font-semibold text-default-400">
                          Filtrar por
                          <i className="fi fi-sr-filter ml-2 text-sm" />
                        </p>
                        <Divider className="m-0 p-0" />
                        <Button size="sm" className="bg-yellow-200 text-warning" onClick={() => filterByStatus('En proceso')}>
                          En proceso
                        </Button>
                        <Button size="sm" className="bg-red-200 text-danger" onClick={() => filterByStatus('Rechazado')}>
                          Rechazado
                        </Button>
                        <Button size="sm" className="bg-[#45d48383] text-success" onClick={() => filterByStatus('Aprobado')}>
                          Aprobado
                        </Button>
                        <Button color="primary" variant="light" onClick={clearFilter}>
                          <i className="fi fi-rr-eraser " />
                          Limpiar
                        </Button>
                      </section>
                    </PopoverContent>
                  </Popover>
                </TableColumn>
                <TableColumn aria-label="Detalles">Detalles</TableColumn>
              </TableHeader>

              <TableBody emptyContent={elements.adminCoordi ? 'No existen solicitudes hechas' : 'No tienes solicitudes hechas'}>
                {currentItems.map((item) => (
                  <TableRow key={item.id_solicitud} className={`hover:bg-gray-200 transition-all ${item.id_solicitud === parseInt(highlightedRequestId) ? 'highlighted-row' : ''}`}>
                    <TableCell>{item.id_solicitud}</TableCell>
                    <TableCell>{item.nombres + ' ' + item.apellidos}</TableCell>
                    <TableCell>{formatDate(item.fecha_creacion)}</TableCell>
                    <TableCell>{item.tipo_solicitud}</TableCell>
                    <TableCell className={` flex justify-center items-center w-[7rem] py-[0] relative top-[13px] bg-red-500 ${selectedValueDetails === 'En proceso' ? 'bg-yellow-200 text-warning rounded-2xl' : getStatusColorClass(item.estado)} ${getStatusColorClass(item.estado)}`}>{item.estado}</TableCell>
                    <TableCell>
                      <i className="fi fi-rr-edit px-3 text-xl cursor-pointer hover:text-yellow-300" onClick={() => modalDetailsEdit(item.id_solicitud)} aria-label="Editar solicitud" />
                      <i className="fi fi-rs-eye text-xl cursor-pointer hover:text-green-600 active:opacity-50" onClick={() => modalDetails(item.id_solicitud)} aria-label="Ver detalles de la solicitud" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className="grid place-items-center w-full mt-[.5rem] ">
              <Pagination className={`relative top-[.5rem]  max-[935px]:mt-[8px]  z-0 searchValue `} total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={request && request.length} onChange={handlePageChange} />{' '}
            </section>
          </section>
          <Footer />
          <section className="absolute right-4">
            <Button className="" variant="bordered" color="success" onClick={modalReport}>
              Generar reportes
            </Button>
          </section>
          {modalOpen && <ModalGenerateReport cerrarModal={setModalOpen} />}
        </section>
      </main>
    </>
  )
}

export { Requests }
