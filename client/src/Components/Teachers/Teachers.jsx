import React, { useEffect, useState } from 'react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Pagination, Card, CardHeader, CardBody, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import { getTeacher } from '../../api/httpRequest'

const Teachers = () => {
  const [filtroVisible, setFiltroVisible] = useState(false) // Estado para controlar la visibilidad del filtro de búsqueda
  const [notifyOpen, setNotifyOpen] = useState(false) //   Estado para activar la barra de notificaciones
  const [teacher, setTeacher] = useState([])

  const [activePage, setActivePage] = useState(1) // Funciones para la paginación y selección de elementos mostar por página

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const [itemsPerPage, setItemsPerPage] = useState(6) // Establece un valor predeterminado en la vista principal

  /* establecer paginado y numero de paginacion */

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value)
    setItemsPerPage(newItemsPerPage)
    setActivePage(1)
  }

  useEffect(() => {
    getTeachers()
  }, [])

  const getTeachers = async () => {
    try {
      const response = await getTeacher()
      const res = response.data.result
      setTeacher(res)
    } catch (error) {
      console.log(error)
    }
  }

  const startIdx = (activePage - 1) * itemsPerPage
  const visibleData = teacher.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(teacher.length / itemsPerPage)

  // Barra de notificaciones

  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }

  // Crear un array de estados para mantener el estado de cada Dropdown
  const [selectedKeysArray, setSelectedKeysArray] = React.useState(Array(teacher.length).fill(new Set(['Instructor'])))

  // Función para manejar el cambio de selección en un Dropdown específico
  const handleDropdownChange = (index, newSelectedKeys) => {
    const newSelectedKeysArray = [...selectedKeysArray]
    newSelectedKeysArray[index] = newSelectedKeys
    setSelectedKeysArray(newSelectedKeysArray)
  }

  return (
    <main className="h-screen flex">
      <Sliderbar />
      <section className="w-full overflow-auto">
        <header className="p-[1.5rem] flex justify-center items-center">
          <section className="w-[40%]">
            <Search filtro={filtroVisible} placeholder={'Buscar instructor'} icon={<i className="fi fi-rr-settings-sliders relative right-[3rem] cursor-pointer hover:bg-default-200 p-[4px] rounded-full" onClick={() => setFiltroVisible(!filtroVisible)} />} />
          </section>
        </header>
        <section className=" flex justify-center">
          <section className="w-[85%] flex justify-end ">
            <select id="itemsPerPage" name="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="outline-none rounded-xl px-[8px] py-[5px] border border-primary">
              <option value={6}>6 Elementos por página</option>
              <option value={12}>12 Elementos por página</option>
              <option value={24}>24 Elementos por página</option>
            </select>
          </section>
        </section>
        <section className="flex justify-center min-h-[65vh] ">
          <section className="grid grid-cols-3 gap-4 mt-[1rem] w-[85%] ">
            {visibleData.map((item, index) => (
              <Card className="h-[13rem] -z-0" key={item.id_usuario}>
                <CardHeader>
                  <img src="/image/teacherFondo.jpg" alt="Fondo" className="h-[4rem] w-full rounded-lg" />
                </CardHeader>
                <CardBody className="pt-2 pb-0 ">{item.nombres}</CardBody>
                <CardFooter>
                  {/* <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" color="primary" className="capitalize">
                        {Array.from(selectedKeysArray[index]).join(', ').replaceAll('_', ' ')}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" color="primary" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeysArray[index]} onSelectionChange={(newSelectedKeys) => handleDropdownChange(index, newSelectedKeys)}>
                      <DropdownItem key="administrador">Administrador</DropdownItem>
                      <DropdownItem key="coordinador">Coordinador</DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                </CardFooter>
              </Card>
            ))}
          </section>
        </section>
        <section className="grid place-items-center pt-[1rem] mb-[2rem]">
          <Pagination className="relative z-0 max-[935px]:pb-[3rem]" total={totalPages || 1} current={activePage} color={'primary'} onChange={handlePageChange} />
        </section>
        <section className="fixed right-[22%] top-[2rem]">
          <section className=" cursor-pointer ">
            <NotifyBadge />
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Teachers }
