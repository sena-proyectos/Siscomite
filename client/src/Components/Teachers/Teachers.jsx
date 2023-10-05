import React, { useEffect, useState } from 'react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button, Pagination, Card, CardHeader, CardBody, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import { changeRolTeacher, getTeacher, search, stateTeacher, stateUser } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'

const Teachers = () => {
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [teacher, setTeacher] = useState([])
  const [userSearch, setUserSearch] = useState([])
  const [message, setMessage] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

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
      // Envía la acción en el cuerpo de la solicitud
      const response = await stateTeacher(idUser, { action })
      const message = response.data.message
      toast.success('¡Genial!', {
        description: message
      })

      // Actualiza el estado del usuario en la lista
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
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error('¡Opss!', {
        description: message
      })
    }
  }

  const searchUser = async (value) => {
    try {
      if (value.trim() === ' ') {
        userSearch([])
        setMessage(null)
      } else {
        const response = await search(value)
        setUserSearch(response.data.user)
        setMessage(null)
      }
    } catch (error) {
      const message = error?.response?.data?.message
      setMessage(message)
      teacher([])
      userSearch([])
    }
  }

  return (
    <main className="h-screen flex">
      <Sliderbar />
      <Toaster position="top-right" closeButton richColors />
      <section className="w-full overflow-auto">
        <header className="p-[1.5rem] grid grid-cols-3 place-items-end">
          <section className="w-[60%] col-span-2 right-0 relative">
            <Search teacher filtro={filtroVisible} placeholder={'Buscar usuarios'} searchStudent={searchUser} icon={<i className="fi fi-rr-settings-sliders relative right-[3rem] cursor-pointer hover:bg-default-200 p-[4px] rounded-full" onClick={() => setFiltroVisible(!filtroVisible)} />} />
          </section>
          <section className="w-full h-full flex justify-center items-center">
            <NotifyBadge />
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
          <section className="grid grid-cols-3 gap-4 mt-[1rem] w-[85%] " aria-label="Instructores registrados">
            {message && <h1>{message}</h1>}
            {!message && userSearch && userSearch.length === 0
              ? visibleData.map((item, index) => (
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
                ))
              : !message &&
                userSearch.map((item, index) => (
                  // ... Código para renderizar los resultados de búsqueda
                  <Card className="h-[13rem] -z-0" key={item.id_usuario}>
                    {/* ... Resto del código de renderizado para los resultados de búsqueda */}
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
                  </Card>
                ))}
          </section>
        </section>
        {userSearch.length > 0 ? (
          ''
        ) : (
          <section className="grid place-items-center pt-[1rem] mb-[2rem]">
            <Pagination className="relative z-0 max-[935px]:pb-[3rem]" total={totalPages || 1} current={activePage} color={'primary'} onChange={handlePageChange} />
          </section>
        )}

        <Footer />
      </section>
    </main>
  )
}

export { Teachers }
