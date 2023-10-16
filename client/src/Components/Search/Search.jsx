// Importaciones necesarias
import './Search.css' // Importar el archivo CSS para estilos específicos
import { useRef, useEffect, useState } from 'react' // Importar React, useRef, useEffect y useState desde React
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react' // Importar componentes de Next UI
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Componente Search
const Search = ({ searchUser, placeholder, icon, filtro, ficha, request, teacher, onDateChange, setSelectedJornada, setSelectedEtapa, setSelectedRol, setSelectedEstado }) => {
  // Referencia al elemento de entrada de texto para búsqueda
  const search = useRef()
  // Referencia para el temporizador de debounce
  const debounceTimeout = useRef(null)
  // Función para manejar la búsqueda con debounce
  const [selectedDate, setSelectedDate] = useState(null)

  const handleSearch = () => {
    const searchValue = search.current.value
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchUser(searchValue)
    }, 300)
  }

  const handleEstadoChange = (estado) => {
    setSelectedEstado(estado)
  }

  const handleJornadaFilterChange = (jornadaFilter) => {
    setSelectedJornada(jornadaFilter)
  }

  const handleEtapaChange = (etapaFilter) => {
    setSelectedEtapa(etapaFilter)
  }

  const handleRol = (rolFilter) => {
    setSelectedRol(rolFilter)
  }

  const resetFilter = () => {
    if (setSelectedEstado) setSelectedEstado('')
    if (setSelectedDate) setSelectedDate('')
    if (setSelectedJornada) setSelectedJornada('')
    if (setSelectedEtapa) setSelectedEtapa('')
    if (setSelectedRol) setSelectedRol('')
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

  return (
    <main className="flex flex-col" method="get" onChange={handleSearch} onSubmit={evnt}>
      <section className="flex items-center w-full  ">
        <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-full max-[900px]:w-[20rem]" placeholder={placeholder} ref={search} autoComplete="off" />
        {icon}
      </section>

      {filtro && (
        <section className="w-[27rem]  z-10 animate-appearance-in absolute mt-[3rem]">
          <section className="bg-white max-[900px]:w-[12rem] border grid shadow-md w-full rounded-xl p-[10px]">
            <section className="flex justify-between">
              <p className="font-semibold pb-0 text-default-400">
                Filtrar por
                <i className="fi fi-sr-filter ml-2 text-xs" />
              </p>
              <Button size="sm" radius="full" color="primary" variant="flat" className="h-6 font-semibold" onClick={resetFilter}>
                <i className="fi fi-rr-eraser" />
                Limpiar
              </Button>
            </section>
            <section className="flex gap-x-3 mt-[1rem]  items-center">
              {request && (
                <section className="w-full max-[900px]:flex max-[900px]:flex-col px-[1rem] relative">
                  <DatePicker selected={selectedDate} onChange={(date) => onDateChange(date)} dateFormat="dd/MM/yyyy" isClearable placeholderText="Selecciona una fecha" className="cursor-pointer border-2 border-primary hover:border-primary hover:border-2 px-5 py-[5px] text-sm rounded-lg outline-none" />
                </section>
              )}

              {teacher && (
                <section className="gap-3 w-full grid grid-cols-2 ">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered" className="w-full">
                        Rol
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="coordinado" onClick={() => handleRol(1)}>
                        Coordinador
                      </DropdownItem>
                      <DropdownItem key="instructor" onClick={() => handleRol(2)}>
                        Instructor
                      </DropdownItem>
                      <DropdownItem key="administrador" onClick={() => handleRol(3)}>
                        Administrador
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" variant="bordered" className="w-full">
                        Estado
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="activo" onClick={() => handleEstadoChange('ACTIVO')}>
                        Activo
                      </DropdownItem>
                      <DropdownItem key="deshabilitado" onClick={() => handleEstadoChange('INACTIVO')}>
                        Desahabilitado
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </section>
              )}
            </section>
          </section>
        </section>
      )}
    </main>
  )
}

export { Search }
