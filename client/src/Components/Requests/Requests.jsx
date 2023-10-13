// Importaciones necesarias
import './Requests.css' // Importar hoja de estilo CSS
import { useState, useEffect } from 'react' // Importar el hook de estado
import { Sliderbar } from '../Sliderbar/Sliderbar' // Importar el componente Sliderbar
import { Search } from '../Search/Search' // Importar el componente Search
import { Footer } from '../Footer/Footer' // Importar el componente Footer
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react' // Importar componentes de la tabla de Next.js
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge' // Importar el componente Notifybadge para notificaciones
import { ModalEditRequest } from '../Utils/Modals/ModalEditRequest' // Importar el componente ModalEditRequest
import { ModalRequest } from '../Utils/Modals/ModalRequest' // Importar el componente ModalRequest
import { getRequest, getRequestByIdUser } from '../../api/httpRequest'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT

import { format } from 'date-fns' // Importar biblioteca para formatear las fechas

import { requestStore } from '../../store/config'

// Componente Requests
const Requests = () => {
  const [isOpen] = useState(false) // Estado para controlar la apertura de un modal
  const [filtroVisible, setFiltroVisible] = useState(false) // Estado para controlar la visibilidad del filtro de búsqueda
  const [request, setRequest] = useState([]) // estado para guardar las solicitudes de la base de datos
  const [requestById, setRequestById] = useState([]) // estado para guardar las solicitudes de usuarios de la base de datos

  // Paginación
  // Número de elementos por página
  const itemsPerPage = 9
  const [activePage, setActivePage] = useState(1)

  const [requestId, setRequestId] = useState(null)
  const [selectedValueDetails, setSelectedValueDetails] = useState('') // Estado para el valor de estado seleccionado

  const [highlightedRequestId, setHighlightedRequestId] = useState(null)

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
        description: "Error al obtener las solicitudes"
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
  const [searchValue, setSearchValue] = useState('') // Estado para el valor de búsqueda
  const [searchResults, setSearchResults] = useState([]) // Estado para los resultados de la búsqueda
  const [selectedEstado, setSelectedEstado] = useState('') // Estado inicial vacío para el filtro de estado la solicitud
  const [selectedDateFilter, setSelectedDateFilter] = useState('') // Estado para la fecha seleccionada

  // Función para manejar la búsqueda de solicitudes por nombre
  const searchRequestsByName = (searchValue) => {
    setSearchValue(searchValue)
    // Filtrar las solicitudes según el nombre y el estado seleccionado
    const filteredResults = currentItems.filter((item) => item.nombres.toLowerCase().includes(searchValue.toLowerCase()) && (selectedEstado === '' || item.estado === selectedEstado))
    setSearchResults(filteredResults)
  }

  // Filtrar las solicitudes por nombre y estado
  const filteredRequests = currentItems.filter((item) => {
    const nombreMatches = item.nombres.toLowerCase().includes(searchValue.toLowerCase())
    const estadoMatches = selectedEstado === '' || item.estado === selectedEstado
    return nombreMatches && estadoMatches
  })

  // Función para aplicar el filtro de fecha
  const filterRequestsByDate = (requests, dateFilter) => {
    if (!dateFilter) {
      // Si no hay fecha seleccionada, devuelve todas las solicitudes
      return requests
    }
    const currentDate = new Date()
    const filteredRequests = requests.filter((item) => {
      switch (dateFilter) {
        case 'week':
          // Filtrar solicitudes de la última semana
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(currentDate.getDate() - 7)
          return new Date(item.fecha_creacion) >= oneWeekAgo
        case 'month':
          // Filtrar solicitudes del último mes
          const oneMonthAgo = new Date()
          oneMonthAgo.setMonth(currentDate.getMonth() - 1)
          return new Date(item.fecha_creacion) >= oneMonthAgo
        case 'year':
          // Filtrar solicitudes del último año
          const oneYearAgo = new Date()
          oneYearAgo.setFullYear(currentDate.getFullYear() - 1)
          return new Date(item.fecha_creacion) >= oneYearAgo
        default:
          // No se aplica ningún filtro de fecha
          return true
      }
    })
    // Devuelve las solicitudes filtradas o todas las solicitudes si no hay filtro aplicado
    return filteredRequests
  }

  return (
    <>
      {modalRequest && <ModalRequest modalDetails={isOpen} cerrarModal={modalDetails} requestID={requestId} />}
      {modalRequestEdit && <ModalEditRequest modalDetailsEdit={isOpen} cerrarModal={modalDetailsEdit} requestID={requestId} reloadFetch={getRequets} fetchById={getRequetsById} />}

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <header className="p-[1.5rem] grid grid-cols-3 place-items-end">
            <section className="w-[60%] col-span-2 right-0 relative">
              <Search
                request
                filtro={filtroVisible}
                placeholder={'Buscar solicitud'}
                icon={<i className="fi fi-rr-settings-sliders relative right-[3rem] cursor-pointer hover:bg-default-200 p-[4px] rounded-full" onClick={() => setFiltroVisible(!filtroVisible)} />}
                searchStudent={searchRequestsByName}
                searchResults={searchResults}
                searchValue={searchValue}
                selectedEstado={selectedEstado}
                setSelectedEstado={setSelectedEstado}
                selectedDateFilter={selectedDateFilter}
                setSelectedDateFilter={setSelectedDateFilter}
              />
            </section>
            <section className="w-full h-full flex justify-center items-center">
              <NotifyBadge />
            </section>
          </header>

          <section className="px-[2rem] top-[.5rem] relative mr-auto h-[73vh] ">
            <Table className="h-full select-none" aria-label="Tabla para ver las solicitudes">
              <TableHeader>
                <TableColumn aria-label="Nombre del solicitante">Nombre del solicitante</TableColumn>
                <TableColumn aria-label="Fecha de la solicitud">Fecha de la solicitud</TableColumn>
                <TableColumn aria-label="Tipo de solicitud">Tipo de solicitud</TableColumn>
                <TableColumn aria-label="Estado">Estado</TableColumn>
                <TableColumn aria-label="Detalles">Detalles</TableColumn>
              </TableHeader>

              <TableBody emptyContent={elements.adminCoordi ? 'No existen solicitudes hechas' : 'No tienes solicitudes hechas'}>
                {filterRequestsByDate(filteredRequests, selectedDateFilter).map((item) => (
                  <TableRow key={item.id_solicitud} className={`hover:bg-gray-200 transition-all ${item.id_solicitud === parseInt(highlightedRequestId) ? 'highlighted-row' : ''}`}>
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
              <Pagination className={`relative top-[.5rem]  max-[935px]:mt-[8px]  z-0 searchValue `} total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={request && request.length} onChange={handlePageChange} />
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Requests }
