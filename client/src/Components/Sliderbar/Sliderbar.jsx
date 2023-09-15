// Importaciones necesarias
import './Sliderbar.css' // Importar el archivo CSS para estilos específicos
import { useEffect, useState } from 'react' // Importar React, useEffect y useState desde React
import { Link, useNavigate, useLocation } from 'react-router-dom' // Importar funciones de navegación y ubicación de React Router DOM
import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT
import { userInformationStore } from '../../store/config'

// Función para saber si la ruta está activa
const isActiveRoute = (currentPath, targetPath) => {
  return currentPath === targetPath
}

const Sliderbar = () => {
  const [selectedIcon, setSelectedIcon] = useState(0) // Estado para controlar el icono seleccionado
  const navigate = useNavigate() // Función de navegación
  const [rol, setRol] = useState(null) // Estado para el rol del usuario

  // Para poner color al componete al seleccionarlo
  const location = useLocation() // Importa useLocation

  useEffect(() => {
    getInformation() // Llamar a la función getInformation al montar el componente
  }, [])

  const { setUserInformation, userInformation } = userInformationStore()

  // Función para obtener información del usuario desde el token JWT
  const getInformation = () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    const nombres = information.nombres
    const apellidos = information.apellidos

    // Mapear los ID de rol a nombres de rol
    if (information.id_rol === 1) information.id_rol = 'Coordinador'
    if (information.id_rol === 2) information.id_rol = 'Instructor'
    if (information.id_rol === 3) information.id_rol = 'Administrador'

    setRol(information.id_rol) // Establecer el rol en el estado
    setUserInformation({ nombres, apellidos, id_usuario: information.id_usuario })
  }

  // Función para cerrar sesión
  const logout = () => {
    Cookie.remove('token') // Eliminar el token de las cookies
    navigate('/') // Redirigir a la página de inicio
  }
  return (
    <main className="sliderbar bg-[#2e323e] m-[1rem] w-[18%]  h-[95vh] relative rounded-2xl text-white flex-col flex items-center ">
      <section className="top flex flex-col items-center p-[30px] text-center w-full">
        <h3 className="mt-[1rem] text-[17px] font-bold">
          {userInformation.nombres} {userInformation.apellidos}
        </h3>
        <p>{rol}</p>
      </section>
      <section className="pages absolute top-[30%]  w-full flex justify-center">
        <ul className="p-0">
          <Link to={'/home'} className="line">
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/home') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rr-home `} title="Inicio" />
              <span className="slideText ml-[10px]">Inicio</span>
            </li>
          </Link>

          <Link to={'/requests'} className="line">
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/requests') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rs-file `} title="Solicitudes" />
              <span className="slideText ml-[10px]"> Solicitudes </span>
            </li>
          </Link>

          <Link className="line" to={'/create'}>
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/create') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rs-add-document `} title="Crear solicitud" />
              <span className="slideText ml-[10px]">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line" to={'/groups'}>
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/groups') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rr-users `} title="Fichas" />
              <span className="slideText ml-[10px]">Fichas</span>
            </li>
          </Link>
          <Link className="line" to={'/rules'}>
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/rules') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rs-document `} title="Reglamento" />
              <span className="slideText ml-[10px]">Reglamento</span>
            </li>
          </Link>
          <Link className="line" to={'/teachers'}>
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/teachers') ? 'bg-[#1a1d24]' : ''}`}>
              <i className={`fi fi-rs-book-bookmark`} title="Instructores" />
              <span className="slideText ml-[10px]">Instructores</span>
            </li>
          </Link>
        </ul>
      </section>
      <section className="absolute bottom-[0.5em]">
        <ul className="p-0 flex flex-col items-center justify-end mb-[20px]">
          <Link className="line" to={'/setting'}>
            <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24] ${isActiveRoute(location.pathname, '/setting') ? 'bg-[#1a1d24]' : ''}`}>
              <i className="fi fi-rr-gears" id="icon" title="Configuración" />
              <span className="slideText ml-[10px]">Configuración</span>
            </li>
          </Link>
          <li className={`relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]`} onClick={logout}>
            <i className="fi fi-rs-exit" id="icon" title="Cerrar sesión" />
            <span className="slideText ml-[10px] cursor-pointer">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  )
}

export { Sliderbar }
