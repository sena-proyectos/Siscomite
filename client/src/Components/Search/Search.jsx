// Importaciones necesarias
import './Search.css' // Importar el archivo CSS para estilos específicos
import { useRef, useEffect } from 'react' // Importar React, useRef, useEffect y useState desde React

// Componente Search
const Search = ({ searchUser, placeholder, icon }) => {
  // Referencia al elemento de entrada de texto para búsqueda
  const search = useRef()
  // Referencia para el temporizador de debounce
  const debounceTimeout = useRef(null)

  // Función para manejar la búsqueda con debounce
  const handleSearch = () => {
    const searchValue = search.current.value
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchUser(searchValue)
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
    <main className="flex flex-col" method="get" onChange={handleSearch} onSubmit={evnt}>
      <form className="flex items-center w-full  ">
        <input type="text" name="buscar" className="shadow-md outline-none rounded-xl p-[10px] w-full max-[900px]:w-[20rem]" placeholder={placeholder} ref={search} autoComplete="off" />
        {icon}
      </form>
    </main>
  )
}

export { Search }
