import './NotifyBar.css'// Importa estilos CSS para este componente.
import { Divider } from '@nextui-org/react'// Importa el componente Divider de la biblioteca '@nextui-org/react'.
import { useState } from 'react'; // Importa el hook useState de React.


// Define una función daysInMonth que calcula la cantidad de días en un mes dado.
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
// Define el componente funcional Notify, que acepta props isOpen y toggleNotify.
export const Notify = ({ isOpen, toggleNotify }) => {
  // Obtiene la fecha actual.
  const currentDate = new Date();
  // Define el estado para el año actual.
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  // Define el estado para el mes actual.
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  // Calcula el día de la semana del primer día del mes actual.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Calcula la cantidad de días en el mes actual.
  const daysCount = daysInMonth(currentYear, currentMonth);
  // Crea un array con números del 1 al número de días en el mes actual.
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
  // Define un array de nombres de meses en español.
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Función que maneja el evento de hacer clic en el botón para retroceder al mes anterior.
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Función que maneja el evento de hacer clic en el botón para avanzar al mes siguiente.
  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

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
            <button onClick={handlePrevMonth}><i className="fi fi-sr-angle-left"/></button>
            <p className="font-bold">{monthNames[currentMonth]} {currentYear}</p>
            <button onClick={handleNextMonth}><i className="fi fi-sr-angle-right"/></button>
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
              <p className="font-semibold block">Solicitud aceptada</p>
              <p className="text-[13px] block">Su solicitud a comité ha sido aprobada</p>
            </section>
          </section>
          <Divider />
        </section>
      </section>
    </main>
  )
}
