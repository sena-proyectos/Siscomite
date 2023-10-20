// Importaciones necesarias
import './Search.css' // Importar el archivo CSS para estilos específicos
import { useRef, useEffect, useState } from 'react' // Importar React, useRef, useEffect y useState desde React
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react' // Importar componentes de Next UI

// Componente Search
const Search = ({ searchStudent, placeholder, icon, filtro, ficha, request, teacher, setSelectedEstado, setSelectedDateFilter, setSelectedJornada, setSelectedEtapa }) => {
  // Estado para controlar la rotación del icono
  const [iconRow, setIconRow] = useState(false)
  // Referencia al elemento de entrada de texto para búsqueda
  const search = useRef()
  // Referencia para el temporizador de debounce
  const debounceTimeout = useRef(null)

  // Función para manejar la búsqueda con debounce
  const handleSearch = () => {
    const searchValue = search.current.value
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchStudent(searchValue)
    }, 300)
  }

  const handleEstadoChange = (estado) => {
    setSelectedEstado(estado)
  }

  const handleDateFilterChange = (dateFilter) => {
    setSelectedDateFilter(dateFilter) // Actualiza el estado de la fecha seleccionada
  }

  const handleJornadaFilterChange = (jornadaFilter) => {
    setSelectedJornada(jornadaFilter)
  }
  const handleEtapaChange = (etapaFilter) => {
    setSelectedEtapa(etapaFilter)
  }

  // Función para prevenir la acción predeterminada del formulario
  const evnt = (e) => {
    e.preventDefault()
  }

  // Limpieza del temporizador de debounce al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  const [sortOrder, setSortOrder] = useState("asc"); // Estado para el orden de los nombres

  return (
    <section className="flex flex-col" method="get" onChange={handleSearch} onSubmit={evnt}>
      <form className="flex items-center w-full  ">
        <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-full max-[900px]:w-[20rem]" placeholder={placeholder} ref={search} autoComplete="off" />
        {icon}
      </form>

      {filtro && (
        <section className="w-[27rem]  z-10 animate-appearance-in absolute mt-[3rem]">
          <section className="bg-white max-[900px]:w-[12rem] border grid shadow-md w-full rounded-xl p-[10px]">
            <p className="font-semibold pb-0 text-default-400">
              Filtrar por
              <i className="fi fi-sr-filter ml-2 text-xs" />
            </p>
            <section className="flex gap-x-3 mt-[1rem]  items-center">
              <Button
                size="sm"
                color="primary"
                variant="bordered"
                radius="sm"
                className="w-[7rem]"
                onClick={() => {
                  setIconRow(!iconRow)
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }}
              >
                <p className="cursor-pointer">Nombre</p>
                <section className={`w-fit ${iconRow ? 'rotate-180' : 'rotate-0'}`}>
                  <i className="fi fi-br-arrow-up cursor-pointer " />
                </section>
              </Button>
              {request && (
                <section className="w-full gap-5 grid grid-cols-2 max-[900px]:flex max-[900px]:flex-col px-[1rem]">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered" className="w-full">
                        Fecha
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="week" onClick={() => handleDateFilterChange('week')}>
                        Hace una semana
                      </DropdownItem>
                      <DropdownItem key="month" onClick={() => handleDateFilterChange('month')}>
                        Hace un mes
                      </DropdownItem>
                      <DropdownItem key="year" onClick={() => handleDateFilterChange('year')}>
                        Hace un año
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered" className="w-full">
                        Estado
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="todos" onClick={() => handleEstadoChange('')}>
                        Todos
                      </DropdownItem>
                      <DropdownItem key="" onClick={() => handleEstadoChange('En proceso')}>
                        En proceso
                      </DropdownItem>
                      <DropdownItem key="aprobado" onClick={() => handleEstadoChange('Aprobado')}>
                        Aprobado
                      </DropdownItem>
                      <DropdownItem key="rechazado" onClick={() => handleEstadoChange('Rechazado')}>
                        Rechazado
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </section>
              )}
              {ficha && (
                <section className="gap-3 w-full grid grid-cols-3">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" size="sm" color="primary">
                        Estado
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="todos" onClick={() => handleEstadoChange('')}>
                        Todos
                      </DropdownItem>
                      <DropdownItem key="activo" onClick={() => handleEstadoChange('Activo')}>
                        Activo
                      </DropdownItem>
                      <DropdownItem key="deshabilitado" onClick={() => handleEstadoChange('Deshabilitado')}>
                        Deshabilitado
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered">
                        Jornada
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="todos" onClick={() => handleJornadaFilterChange('')}>
                        Todos
                      </DropdownItem>
                      <DropdownItem key={'mañana'} onClick={() => handleJornadaFilterChange('MAÑANA')}>
                        Mañana
                      </DropdownItem>
                      <DropdownItem key={'tarde'} onClick={() => handleJornadaFilterChange('TARDE')}>
                        Tarde
                      </DropdownItem>
                      <DropdownItem key={'noche'} onClick={() => handleJornadaFilterChange('NOCHE')}>
                        Noche
                      </DropdownItem>
                      <DropdownItem key={'vitual'} onClick={() => handleJornadaFilterChange('VIRTUAL')}>
                        Virtual
                      </DropdownItem>
                      <DropdownItem key={'finesDeSenama'} onClick={() => handleJornadaFilterChange('FINES DE SEMANA')}>
                        Fines de semana
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered">
                        Etapa
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="todos" onClick={() => handleEtapaChange('')}>
                        Todos
                      </DropdownItem>
                      <DropdownItem onClick={() => handleEtapaChange('LECTIVA')}>Lectiva</DropdownItem>
                      <DropdownItem onClick={() => handleEtapaChange('PRACTICA')}>Práctica</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </section>
              )}
              {teacher && (
                <section className="gap-3 w-full grid grid-cols-2 ">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" size="sm" color="primary" className="w-full">
                        Estado
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownMenu>
                        <DropdownItem key="todos" onClick={() => handleEstadoChange('')}>
                          Todos
                        </DropdownItem>
                        <DropdownItem key="activo" onClick={() => handleEstadoChange('Activo')}>
                          Activo
                        </DropdownItem>
                        <DropdownItem key="deshabilitado" onClick={() => handleEstadoChange('Deshabilitado')}>
                          Deshabilitado
                        </DropdownItem>
                      </DropdownMenu>{' '}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered" className="w-full">
                        Rol
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="coordinado">Coordinado</DropdownItem>
                      <DropdownItem key="instructor">Instructor</DropdownItem>
                      <DropdownItem key="ddministrador">Administrador</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </section>
              )}
            </section>
          </section>
        </section>
      )}
    </section>
  )
}

export { Search }
