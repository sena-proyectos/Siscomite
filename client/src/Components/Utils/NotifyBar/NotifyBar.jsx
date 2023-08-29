import "./NotifyBar.css";

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
    <main  className="flex h-screen  ">
      <section className={`p-[1rem] h-screen animate w-[20rem] bg-white shadow-md  ${isOpen ? "visible" : "hidden"} `}>
        <header className="flex">
          <section className="cursor-pointer" onClick={toggleNotify}>
            <i class="fi fi-sr-angle-circle-right text-xl"></i>
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
          <section className="overflow-auto mb-1"></section>
        </section>
      </section>
    </main>
  );
};
