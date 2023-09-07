import "./NotifyBar.css";
import { Divider } from "@nextui-org/react";

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export const Notify = ({ isOpen, toggleNotify }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysCount = daysInMonth(currentYear, currentMonth);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <main>
      <section className={`p-[1rem] h-[95vh] rounded-2xl m-[1rem] fixed top-0 right-0 w-[20rem] bg-white shadow-md  overflow-auto ${isOpen ? "visible" : "out"} `}>
        <header className="flex">
          <section className="cursor-pointer" onClick={toggleNotify}>
            <i className="fi fi-sr-angle-circle-right text-xl"></i>
          </section>
          <p className="ml-[4.5rem] flex items-center">Notificaciones</p>
        </header>
        <section className="w-[95%] mx-auto mt-2 ">
          <h2 className="text-md font-light px-2 mb-2 flex justify-between ">
            <p className="font-bold">Calendario</p>
            {monthNames[currentMonth]}
          </h2>
          <section className="grid grid-cols-7 mb-1">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"].map((day) => (
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
              <section key={day} className={`text-center py-1 ${day === currentDate.getDate() ? "bg-[#2e323e] text-white rounded-full" : ""}`}>
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
  );
};
