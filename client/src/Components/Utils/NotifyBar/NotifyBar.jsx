import './NotifyBar.css'
import { Divider } from '@nextui-org/react'
import { useState, useEffect } from 'react' // Asegúrate de importar useState desde React
import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT
import { getMessageById, sendEmail, updateStateMessage } from '../../../api/httpRequest'
import { Link } from 'react-router-dom'
import { userInformationStore } from '../../../store/config'

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

export const Notify = ({ isOpen, toggleNotify, onNotifyClic }) => {
  const currentDate = new Date()
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [message, setMessage] = useState([])

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const daysCount = daysInMonth(currentYear, currentMonth)
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1)

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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
  const { userInformation } = userInformationStore()

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const response = await getMessageById(userInformation.id_usuario)
          const res = response.data.result
          console.log(res);
          setMessage(res)

          // handleNewNotification()
          // sendMail()
        } catch (error) {
          // Manejar errores
        }
      }
      fetchData()
    }
  }, [isOpen])

  const sendMail = async () => {
    // Verifica si hay un último mensaje y no se ha enviado un correo
    const token = Cookie.get('token')
    const information = jwt(token)
    const dataValue = { to: information.email_sena, subject: 'Novedad en las solicitudes a comité', text: latestMessage.mensaje }
    try {
      await sendEmail(dataValue)
    } catch (error) {}
  }

  const changeMessageState = async (idMessage) => {
    try {
      await updateStateMessage(idMessage)
    } catch (error) {}
  }

  // Función para mostrar una notificación
  function showNotification(title, options) {
    // Verificamos si el navegador admite notificaciones
    if (!('Notification' in window)) {
      console.log('Este navegador no admite notificaciones.')
      return
    }

    // Verificamos si el usuario ha permitido las notificaciones
    if (Notification.permission === 'granted') {
      // Si el usuario ha permitido las notificaciones, mostramos una notificación
      new Notification(title, options)
    } else if (Notification.permission !== 'denied') {
      // Si el usuario no ha decidido sobre las notificaciones, solicitamos permiso
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // Si se concede el permiso, mostramos la notificación
          new Notification(title, options)
        }
      })
    }
  }

  // En tu componente Notify, después de recibir una nueva notificación
  // Puedes llamar a la función showNotification para mostrarla en el escritorio
  const handleNewNotification = () => {
    showNotification('Nuevo mensaje', { body: message[0].mensaje })
  }

  return (
    <main>
      <section className={`p-[1rem] h-[95vh] rounded-2xl m-[1rem] fixed top-0 right-0 w-[20rem] bg-white shadow-md  overflow-auto ${isOpen ? 'visible' : 'out'} `}>
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
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'].map((day) => (
              <section className="font-bold text-sm" key={day}>
                {day}
              </section>
            ))}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <section key={`empty-${index}`} />
              ))}
            {daysArray.map((day) => (
              <section key={day} className={`text-center py-1 ${day === currentDate.getDate() ? 'bg-[#2e323e] text-white rounded-full' : ''}`}>
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
              <Link to={`/requests/${item.id_solicitud}`} key={item.id_mensaje}>
                <div onClick={onNotifyClic}>
                  <section className="overflow-auto mt-5 mb-1 flex transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl cursor-pointer" onClick={() => changeMessageState(item.id_mensaje)}>
                    <i className="fi fi-sr-bell-school text-green-500 pr-[8px] text-[2rem]"></i>
                    <section className="items-center">
                      <p className="font-semibold block">Cambios en la solicitud</p>
                      <p className="text-[13px] block">{item.mensaje}</p>
                    </section>
                  </section>
                </div>
              </Link>
            ))}
          <Divider />
        </section>
        {message.length === 0 && <h1 className="h-full max-h-[45vh] grid items-center text-center text-gray-500 ">No tienes mensajes disponibles</h1>}
      </section>
    </main>
  )
}
