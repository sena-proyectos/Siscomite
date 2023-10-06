import './NotifyBar.css' // Importa un archivo de estilo NotifyBar.css.
import { Divider } from '@nextui-org/react' // Importa el componente Divider de una biblioteca externa.
import { useState, useEffect } from 'react' // Importa los hooks useState y useEffect de React.
import { getMessageById, sendEmail, updateStateMessage } from '../../../api/httpRequest' // Importa funciones para contar mensajes, obtener mensajes por ID, enviar correos electrónicos y actualizar estados de mensajes.
import { useNavigate } from 'react-router-dom' // Importa el componente Link de React Router para crear enlaces.
import { userInformationStore, requestStore } from '../../../store/config' // Importa una función para obtener información del usuario desde una tienda.

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate() // Función para obtener el número de días en un mes.

export const Notify = ({ isOpen, toggleNotify, onNotifyClic }) => {
  const currentDate = new Date()
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()) // Estado para el año actual.
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()) // Estado para el mes actual.
  const [message, setMessage] = useState([]) // Estado para almacenar mensajes.

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() // Día de la semana en que comienza el mes.

  const daysCount = daysInMonth(currentYear, currentMonth) // Número de días en el mes.
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1) // Arreglo de días del mes.

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] // Nombres de los meses.

  const navigate = useNavigate()

  // Función que maneja el evento de hacer clic en el botón para retroceder al mes anterior.
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1
    let newYear = currentYear
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  // Función que maneja el evento de hacer clic en el botón para avanzar al mes siguiente.
  const handleNextMonth = () => {
    let newMonth = currentMonth + 1
    let newYear = currentYear
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  const { userInformation } = userInformationStore() // Obtiene información del usuario desde una tienda.
  const { setRequestInformation } = requestStore() // Obtiene información del usuario desde una tienda.

  useEffect(() => {
    if (isOpen) {
      // Función para obtener mensajes si el componente está abierto.
      const fetchData = async () => {
        try {
          const response = await getMessageById(userInformation.id_usuario) // Obtiene mensajes por ID de usuario.
          const res = response.data.result
          setMessage(res) // Almacena los mensajes en el estado.
        } catch (error) {
          // Maneja errores si ocurren.
        }
      }
      fetchData() // Llama a la función fetchData inmediatamente.

      const intervalId = setInterval(fetchData, 100) // Establece un intervalo para actualizar los mensajes cada 100 milisegundos.

      return () => {
        clearInterval(intervalId) // Limpia el intervalo cuando el componente se desmonta.
      }
    }
  }, [isOpen]) // Se ejecuta cuando isOpen cambia.

  /* Actualizar el estado del mensaje al hacer clic */
  const changeMessageState = async (idMessage, idRequest) => {
    setRequestInformation({ id_solicitud: idRequest })
    navigate('/requests')
    try {
      await updateStateMessage(idMessage); // Actualiza el estado del mensaje al hacer clic.
    } catch (error) {
      // Maneja errores si ocurren.
    }
  }

  return (
    <main>
      <section className={`p-[1rem] h-[95vh] rounded-2xl m-[1rem] fixed top-0 right-0 w-[20rem] bg-white shadow-md overflow-auto ${isOpen ? 'visible' : 'out'}`}>
        <header className="flex">
          <section className="cursor-pointer" onClick={toggleNotify}>
            <i className="fi fi-sr-angle-circle-right text-xl"></i>
          </section>
          <p className="ml-[4.5rem] flex items-center">Notificaciones</p>
        </header>
        <section className="w-[95%] mx-auto mt-2 ">
          <h2 className="text-md font-light px-2 mb-2 flex justify-between">
            <button onClick={handlePrevMonth}>
              <i className="fi fi-sr-angle-left" />
            </button>
            <p className="font-bold">
              {monthNames[currentMonth]} {currentYear}
            </p>
            <button onClick={handleNextMonth}>
              <i className="fi fi-sr-angle-right" />
            </button>
          </h2>
          <section className="grid grid-cols-7 mb-1">
            {/* Renderiza los nombres de los días de la semana */}
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'].map((day) => (
              <section className="font-bold text-sm" key={day}>
                {day}
              </section>
            ))}
            {/* Renderiza espacios en blanco para los días previos al primer día del mes */}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <section key={`empty-${index}`} />
              ))}
            {/* Renderiza los números de los días del mes */}
            {daysArray.map((day) => (
              <section key={day} className={`text-center py-1 ${currentMonth === currentDate.getMonth() && day === currentDate.getDate() ? 'bg-[#2e323e] text-white rounded-full' : ''}`}>
                {day}
              </section>
            ))}
          </section>
        </section>
        <section className="mt-5">
          <p className="font-extrabold text-center">Nuevos mensajes</p>
          {message &&
            message.length > 0 &&
            message.map((item) => (
                <div onClick={onNotifyClic} key={item.id_mensaje}>
                  <section className="overflow-auto mt-5 mb-1 flex transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl cursor-pointer" onClick={() => changeMessageState(item.id_mensaje, item.id_solicitud)}>
                    <i className="fi fi-sr-bell-school text-green-500 pr-[8px] text-[2rem]"></i>
                    <section className="items-center">
                      <p className="font-semibold block">Cambios en la solicitud</p>
                      <p className="text-[13px] block">{item.mensaje}</p>
                    </section>
                  </section>
                </div>
            ))}
          <Divider /> {/* Agrega un separador. */}
        </section>
        {message.length === 0 && <h1 className="h-full max-h-[45vh] grid items-center text-center text-gray-500 ">No tienes mensajes disponibles</h1>}
      </section>
    </main>
  )
}
