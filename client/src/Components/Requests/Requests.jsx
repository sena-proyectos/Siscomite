// Importaciones necesarias
import './Requests.css' // Importar hoja de estilo CSS
import { useState } from 'react' // Importar el hook de estado
import { Sliderbar } from '../Sliderbar/Sliderbar' // Importar el componente Sliderbar
import { Search } from '../Search/Search' // Importar el componente Search
import { Footer } from '../Footer/Footer' // Importar el componente Footer
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react' // Importar componentes de la tabla de Next.js
import { Notify } from '../Utils/NotifyBar/NotifyBar' // Importar el componente Notify para notificaciones
import { ModalEditRequest } from '../Utils/Modals/ModalEditRequest' // Importar el componente ModalEditRequest
import { ModalRequest } from '../Utils/Modals/ModalRequest' // Importar el componente ModalRequest

// Componente Requests
const Requests = () => {
  const [isOpen] = useState(false) // Estado para controlar la apertura de un modal
  const [filtroVisible, setFiltroVisible] = useState(false) // Estado para controlar la visibilidad del filtro de búsqueda

  // Datos de ejemplo para la tabla
  const data = [
    { id: 1, name: 'Azul Andres Velez Romero', date: '02/10/2023', value: 'Aprobado' }
    // ... (otros datos)
  ]

  // Paginación
  const itemsPerPage = 9 // Número de elementos por página
  const [activePage, setActivePage] = useState(1) // Número de página activa

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  // Obtiene una clase CSS basada en el estado de aprobación
  const getStatusColorClass = (status) => {
    const statusColorMap = {
      Aprobado: 'bg-[#45d48383] text-success rounded-2xl',
      Rechazado: 'bg-red-200 text-danger rounded-2xl',
      Pendiente: 'bg-yellow-200 text-warning rounded-2xl'
    }
    return statusColorMap[status] || ''
  }

  // Estado y función para controlar la apertura del modal de detalles
  const [modalRequest, setModalDetails] = useState(false)
  const modalDetails = () => {
    setModalDetails(!modalRequest)
  }

  // Estado y función para controlar la apertura del modal de edición de detalles
  const [modalRequestEdit, setModalDetailsEdit] = useState(false)
  const modalDetailsEdit = () => {
    setModalDetailsEdit(!modalRequestEdit)
  }

  // Estado para controlar la apertura de la barra de notificaciones
  const [notifyOpen, setNotifyOpen] = useState(false)

  // Función para alternar la visibilidad de la barra de notificaciones
  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }
  return (
    <>
      {modalRequest && <ModalRequest modalDetails={isOpen} cerrarModal={modalDetails} />}
      {modalRequestEdit && <ModalEditRequest modalDetailsEdit={isOpen} cerrarModal={modalDetailsEdit} />}

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <header className="p-[1.5rem] flex justify-center items-center">
            <section className="w-[40%]">
              <Search filtro={filtroVisible} placeholder={'Buscar solicitud'} icon={<i className="fi fi-rr-settings-sliders relative right-[3rem] cursor-pointer hover:bg-default-200 p-[4px] rounded-full" onClick={() => setFiltroVisible(!filtroVisible)} />} />
            </section>
            <section className="absolute right-[20%] cursor-pointer justify-center ">
              {notifyOpen ? (
                <></>
              ) : (
                <>
                  <section className="bg-blue-200 rounded-full w-[2rem] h-[2rem] grid place-items-center" onClick={toggleNotify}>
                    <i className="fi fi-ss-bell text-blue-400 p-[.3rem]" />
                  </section>
                </>
              )}
            </section>
          </header>

          <section className="px-[2rem] top-[.5rem] relative mr-auto h-[73vh] ">
            <Table className="h-full ">
              <TableHeader>
                <TableColumn>N°</TableColumn>
                <TableColumn>Solicitud</TableColumn>
                <TableColumn>Fecha solicitud</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Detalles</TableColumn>
              </TableHeader>
              <TableBody emptyContent={'No hay información disponible.'}>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className={` flex justify-center items-center w-[5.5rem] py-[0] relative top-[.5rem] ${getStatusColorClass(item.value)}`}>{item.value}</TableCell>
                    <TableCell>
                      <i className="fi fi-rr-edit px-3 text-xl cursor-pointer hover:text-yellow-300" onClick={modalDetailsEdit} />
                      <i className="fi fi-rs-eye text-xl cursor-pointer  hover:text-green-600 active:opacity-50" onClick={modalDetails} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className="grid place-items-center w-full mt-[.5rem] ">
              <Pagination className="z-0" total={10} initialPage={1} color={'primary'} totalitemscount={data.length} onChange={handlePageChange} />
            </section>
            <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Requests }
