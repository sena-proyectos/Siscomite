import './NotifyBar.css'
import { Divider } from '@nextui-org/react'
import { useState, useEffect } from 'react' // Asegúrate de importar useState desde React
import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT
import { getRequest } from '../../../api/httpRequest'

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

export const Notify = ({ isOpen, toggleNotify }) => {
  const currentDate = new Date()
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [previousRequests, setPreviousRequests] = useState([])
  const [newRequestCount, setNewRequestCount] = useState(0)

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

  


  const getElementsByRole = () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    let rolToken = information.id_rol

    // Mapear los ID de rol a nombres de rol
    if (rolToken === 1) rolToken = 'Coordinador'
    if (rolToken === 2) rolToken = 'Instructor'
    if (rolToken === 3) rolToken = 'Administrador'

    return {
      adminCoordi: rolToken === 'Administrador' || rolToken === 'Coordinador',
      administration: rolToken === 'Administrador',
      coordination: rolToken === 'Coordinador',
      instructor: rolToken === 'Instructor'
    }
  }

  // Obtener los elementos que se deben mostrar según el rol
  // const elements = getElementsByRole()

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
          <p className="font-extrabold">Nuevos mensajes</p>
          <section className="overflow-auto mt-5 mb-1 flex transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl">
            <i className="fi fi-sr-bell-school text-green-500 pr-[8px] text-[2rem]"></i>
            <section className="items-center">
              <p className="font-semibold block">Cambios en la solicitud</p>
              <p className="text-[13px] block">Su solicitud a comité ha sido aprobada</p>
            </section>
          </section>
          <Divider />
        </section>
      </section>
    </main>
  )
}
