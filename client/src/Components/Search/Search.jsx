// Importaciones necesarias
import './Search.css' // Importar el archivo CSS para estilos específicos
import { useRef, useEffect, useState } from 'react' // Importar React, useRef, useEffect y useState desde React
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react' // Importar componentes de Next UI

// Componente Search
const Search = ({ searchStudent, placeholder, icon, filtro, ficha, request, teacher }) => {
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
        <section className="w-[27rem] top-[4.5rem] absolute z-10 animate-appearance-in">
          <section className="bg-white border grid  shadow-md w-full rounded-xl p-[10px]">
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
                }}
              >
                <p className="cursor-pointer">Nombre</p>
                <section className={`w-fit ${iconRow ? 'rotate-180' : 'rotate-0'}`}>
                  <i className="fi fi-br-arrow-up cursor-pointer " x />
                </section>
              </Button>
              {request && (
                <section className="w-full gap-5 grid grid-cols-2 px-[1rem]">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" color="primary" variant="bordered"  className="w-full ">
                          Fecha
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem key="old">Más antigua</DropdownItem>
                        <DropdownItem key="new">Más reciente</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" color="primary" variant="bordered"  className="w-full">
                          Estado
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem key="pendiente">Pendiente</DropdownItem>
                        <DropdownItem key="aprobado">Aprobado</DropdownItem>
                        <DropdownItem key="rechazado">Rechazado</DropdownItem>
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
                        <DropdownItem key="activo">Activo</DropdownItem>
                        <DropdownItem key="deshabilitado">Deshabilitado</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm" color="primary" variant="bordered">Jornada</Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Mañana</DropdownItem>
                        <DropdownItem>Tarde</DropdownItem>
                        <DropdownItem>Noche</DropdownItem>
                        <DropdownItem>Virtual</DropdownItem>
                        <DropdownItem>Fines de semana</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm" color="primary" variant="bordered">Etapa</Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Lectiva</DropdownItem>
                        <DropdownItem>Práctica</DropdownItem>
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
                        <DropdownItem key="activo">Activo</DropdownItem>
                        <DropdownItem key="deshabilitado">Deshabilitado</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm" color="primary" variant="bordered" className="w-full">Rol</Button>
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
    </form>
  )
}

export { Search }
