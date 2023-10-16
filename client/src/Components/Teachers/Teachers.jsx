import React, { useEffect, useState } from 'react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button, Pagination, Card, CardHeader, CardBody, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Popover, PopoverTrigger, PopoverContent, Divider } from '@nextui-org/react'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import { changeRolTeacher, getTeacher, search, stateTeacher, stateUser } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'

import sw from 'sweetalert2'

const Teachers = () => {
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [teacher, setTeacher] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [searchValue, setSearchValue] = useState('')
  const [sortOrder, setSortOrder] = useState('asc') // Estado para rastrear el orden de clasificación
  const [selectedEstado, setSelectedEstado] = useState('') // Estado inicial vacío para el filtro de estado la solicitud
  const [selectedRol, setSelectedRol] = useState('')

  const [selectedKeysArray, setSelectedKeysArray] = useState(Array(teacher.length).fill(''))

  const startIdx = (activePage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const visibleData = teacher.slice(startIdx, endIdx)
  const totalPages = Math.ceil(teacher.length / itemsPerPage)

  useEffect(() => {
    getTeachers()
  }, [])

  const getTeachers = async () => {
    try {
      const response = await getTeacher()
      const res = response.data.result
      setTeacher(res)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value)
    setItemsPerPage(newItemsPerPage)
    setActivePage(1)
  }

  const handleDropdownChange = async (index, newValue, userID) => {
    const newSelectedKeysArray = [...selectedKeysArray]
    newSelectedKeysArray[index] = newValue
    setSelectedKeysArray(newSelectedKeysArray)

    const id_rol = mapRolToId(newValue) // Función para mapear roles a IDs
    if (id_rol !== null) {
      try {
        // Llama a la función para cambiar el rol del profesor
        const response = await changeRolTeacher(userID, { id_rol })
        const message = response.data.message
        toast.success('¡Genial!', {
          description: message
        })
      } catch (error) {
        const message = error?.response?.data?.message
        toast.error('¡Opss!', {
          description: message
        })
      }
    }
  }

  const mapRolToId = (rol) => {
    // Mapea nombres de rol a IDs según tus necesidades
    switch (rol) {
      case 'Coordinador':
        return 1
      case 'Instructor':
        return 2
      case 'Administrador':
        return 3
      default:
        return null // Retorna null si no se encuentra un rol válido
    }
  }

  const toggleUserState = async (user) => {
    const idUser = user.id_usuario
    const action = user.estado === 'ACTIVO' ? 'deshabilitar' : 'habilitar' // Determina la acción según el estado actual
    try {
      sw.fire({
        title: `${action === 'habilitar' ? '¿Estás seguro que quieres volver a habilitar este usuario?' : '¿Estás seguro que quieres deshabilitar este usuario?'}`,
        text: `${action === 'habilitar' ? 'El usuario podrá usar nuevamente Siscomite' : 'El usuario no podrá usar Siscomite si está inhabilitado'}`,
        showDenyButton: true,
        confirmButtonText: `${action === 'habilitar' ? 'Habilitar' : 'Deshabilitar'}`,
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await stateTeacher(idUser, { action })
          const message = response.data.message
          toast.success('¡Genial!', {
            description: message
          })

          const updatedTeacher = teacher.map((t) => {
            if (t.id_usuario === user.id_usuario) {
              // Cambia el valor de estado para el usuario seleccionado
              return {
                ...t,
                estado: user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
              }
            }
            return t
          })
          setTeacher(updatedTeacher)
        }
      })
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error('¡Opss!', {
        description: message
      })
    }
  }

  // ------------ Filtros ----------
  // Función para manejar la búsqueda de usuarios por nombre
  const filterNames = (searchValue) => {
    setSearchValue(searchValue)

    if (!searchValue) {
      // Si no hay un valor de búsqueda, obtén todos los usuarios
      getTeachers()
    } else {
      // Filtrar usuarios por nombre y apellido
      const filteredUser = teacher.filter((item) => {
        const nombre = item.nombres.toLowerCase().toUpperCase().includes(searchValue.toLowerCase().toUpperCase())
        const apellido = item.apellidos.toLowerCase().toUpperCase().includes(searchValue.toLowerCase().toUpperCase())

        return nombre || apellido
      })

      setTeacher(filteredUser)
    }
  }

  // Función para ordenar la lista de usuarios por nombre
  const sortTeacherByName = () => {
    const sortedTecher = [...teacher]
    sortedTecher.sort((a, b) => {
      const nameA = `${a.nombres} ${a.apellidos}`.toLowerCase()
      const nameB = `${b.nombres} ${b.apellidos}`.toLowerCase()
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })

    // Cambiar el orden de clasificación para la próxima vez
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')

    setTeacher(sortedTecher)
  }

  // Función para filtrar las usuarios por estado y rol
  const filterTeacher = () => {
    // Filtrar usuarios por estado y rol
    let filteredTeacher = teacher

    if (selectedEstado) {
      filteredTeacher = filteredTeacher.filter((teacher) => teacher.estado.toLowerCase() === selectedEstado.toLowerCase())
    }

    if (selectedRol) {
      filteredTeacher = filteredTeacher.filter((teacher) => teacher.id_rol.toString() === selectedRol.toString())
    }

    // Actualizar la lista de usuarios después de aplicar los filtros
    setTeacher(filteredTeacher)
  }

  // // Función para aplicar filtros
  const applyFilters = () => {
    filterTeacher()
  }

  // Función para limpiar los filtros
  const clearFilter = () => {
    setSelectedEstado('')
    setSelectedRol('')
    getTeachers() // Recarga los usuarios originales
  }

  return (
    <main className="h-screen flex">
      <Sliderbar />
      <Toaster position="top-right" closeButton richColors />
      <section className="w-full overflow-auto">
        <header className="p-[1.25rem] grid grid-cols-3 place-items-end">
          <section className="w-[60%] col-span-2 right-0 relative">
            <Search teacher filtro={filtroVisible} placeholder={'Buscar instructor'} icon={<i className="fi fi-br-search relative right-[3rem]" />} searchUser={filterNames} searchValue={searchValue} />
          </section>
          <section className="w-full h-full flex justify-center items-center">
            <NotifyBadge />
          </section>
        </header>
        <section className=" flex justify-center">
          <section className="w-[85%] flex justify-between ">
            <section>
              <Button onClick={sortTeacherByName} color="primary" variant="solid" className="mr-2 text-lg">
                {sortOrder === 'asc' ? <i className="fi fi-rr-sort-alpha-up cursor-pointer" /> : <i className="fi fi-sr-sort-alpha-down-alt cursor-pointer" />}
              </Button>
              <Popover placement="right">
                <PopoverTrigger>
                  <Button variant='bordered' color='primary' className="text-[15px] font-bold">
                    <i className="fi fi-rr-settings-sliders relative cursor-pointer " />
                    Filtros
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <section className="px-1 py-2 flex flex-col gap-y-4">
                    <p className="font-semibold text-default-400">
                      Filtrar por
                      <i className="fi fi-sr-filter ml-2 text-sm" />
                    </p>
                    <Divider />
                    <select name="estado" onChange={(e) => setSelectedEstado(e.target.value)} value={selectedEstado} className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                      <option value="">Estado</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Deshabilitado</option>
                    </select>
                    <select name="rol" onChange={(e) => setSelectedRol(e.target.value)} value={selectedRol} className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                      <option value="">Rol</option>
                      <option value="1">Coordinador</option>
                      <option value="2">Instructor</option>
                      <option value="3">Administrador</option>
                    </select>

                    <section className="">
                      <Button className="ml-3" color="primary" variant="light" onClick={clearFilter}>
                        <i className="fi fi-rr-eraser " />
                        Limpiar
                      </Button>
                      <Button className="ml-3" color="success" variant="light" onClick={applyFilters}>
                        <i className="fi fi-br-check" />
                        Aplicar
                      </Button>
                    </section>
                  </section>
                </PopoverContent>
              </Popover>
            </section>
            <section>
              <select id="itemsPerPage" name="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="px-3 inline-flex shadow-lg  bg-default-100 h-unit-10 rounded-medium items-start justify-center gap-0 outline-none py-2 border border-[#0b0b9771]">
                <option value={6}>6 Elementos por página</option>
                <option value={12}>12 Elementos por página</option>
                <option value={24}>24 Elementos por página</option>
              </select>
            </section>
          </section>
        </section>
        <section className="flex justify-center min-h-[65vh] max-[900px]:h-screen max-sm:h-[210%] max-[935px]:p-5">
          <section className="grid grid-cols-3 gap-4 mt-[1rem] w-[85%] max-[900px]:grid-cols-2 max-[700px]:grid-cols-1" aria-label="Instructores registrados">
            {visibleData.length === 0 ? <h1 className="grid place-content-center col-span-3 text-center text-gray-600">No se encontró al usuario</h1> : ''}
            {visibleData.map((item, index) => (
              // ... Código para renderizar los datos regulares
              <Card className="h-[13rem] -z-0" key={item.id_usuario}>
                <CardHeader>
                  <img src="/image/teacherFondo.jpg" alt="Fondo" className="h-[4rem] w-full rounded-lg" />
                </CardHeader>
                <CardBody className="pt-2 pb-0 ">
                  <strong>{item.nombres + ' ' + item.apellidos}</strong>
                  <section className="flex gap-2">
                    Rol actual:
                    <p className="text-gray-500"> {item.id_rol === 1 ? 'Coordinador' : item.id_rol === 2 ? 'Instructor' : 'Administrador'}</p>
                  </section>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <Dropdown aria-label="Seleccionar el rol">
                    <DropdownTrigger aria-label={`Establecer el rol para ${item.nombres} ${item.apellidos}`}>
                      <Button variant="faded" aria-label={`Desplegar lista de roles para ${item.nombres} ${item.apellidos}`} onClick={() => handleDropdownChange(index, 'Cambiar rol', item.id_usuario)}>
                        {selectedKeysArray[index] || 'Cambiar rol'}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleDropdownChange(index, 'Coordinador', item.id_usuario)} aria-label="Seleccionar Coordinador">
                        Coordinador
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDropdownChange(index, 'Instructor', item.id_usuario)} aria-label="Seleccionar Instructor">
                        Instructor
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDropdownChange(index, 'Administrador', item.id_usuario)} aria-label="Seleccionar Administrador">
                        Administrador
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button variant="bordered" color={item.estado === 'ACTIVO' ? 'danger' : 'success'} className="mr-1" onClick={() => toggleUserState(item)}>
                    {item.estado === 'ACTIVO' ? 'Deshabilitar usuario' : 'Habilitar usuario'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </section>

        <section className="grid place-items-center pt-[1rem] mb-[2rem]">
          <Pagination className="relative z-0 max-[935px]:pb-[3rem]" total={totalPages || 1} current={activePage} color={'primary'} onChange={handlePageChange} />
        </section>

        <Footer />
      </section>
    </main>
  )
}

export { Teachers }
