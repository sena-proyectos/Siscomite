// Importaciones necesarias
import './Search.css' // Importar el archivo CSS para estilos específicos
import { useRef, useEffect, useState } from 'react' // Importar React, useRef, useEffect y useState desde React
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react' // Importar componentes de Next UI

// Componente Search
const Search = ({ searchStudent, placeholder, icon, filtro }) => {
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
    <form className="flex" method="get" onChange={handleSearch} onSubmit={evnt}>
      <section className="flex items-center w-full">
        <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-full" placeholder={placeholder} ref={search} autoComplete="off" />
        {icon}
      </section>

      {filtro && (
        <section className="w-[10rem] absolute right-[13rem] z-10 animate-appearance-in">
          <section className="bg-white gap-4 grid place-items-center shadow-md w-full rounded-xl p-[10px]">
            <p className="font-semibold border-b border-b-slate-950">Filtrar por</p>
            <section
              className="text-[13px] flex gap-3 "
              onClick={() => {
                setIconRow(!iconRow)
              }}
            >
              <p className="cursor-pointer">Nombre</p>
              <section className={`w-fit ${iconRow ? 'rotate-180' : 'rotate-0'}`}>
                <i className="fi fi-br-arrow-up cursor-pointer " x />
              </section>
            </section>
            <section>
              <Dropdown placement="right-start">
                <DropdownTrigger>
                  <Button className="z-0 w-[6rem]" variant="bordered" color="primary" size="sm">
                    Fecha
                  </Button>
                </DropdownTrigger>
                <DropdownMenu  aria-label="Fecha">
                  <DropdownItem key="new">Más reciente</DropdownItem>
                  <DropdownItem key="old">Más antigua</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </section>
            <section>
              <Dropdown placement="right-start">
                <DropdownTrigger>
                  <Button className="z-0 w-[6rem]" variant="bordered" color="primary" size="sm">
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="aprobado">Aprobado</DropdownItem>
                  <DropdownItem key="rechazado">Rechazado</DropdownItem>
                  <DropdownItem key="pendiente">Pendiente</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </section>
          </section>
        </section>
      )}
    </form>
  )
}

export { Search }
