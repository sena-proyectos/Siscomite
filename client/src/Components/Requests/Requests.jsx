import "./Requests.css";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Button } from "../Utils/Button/Button";

const Requests = () => {
  const data = [
    { id: 1, name: "Azul Andres Velez Romero", date: "02/10/2023" , value: "Aprobado" },
    { id: 2, name: "Carlos Perez Falcó", date: "02/10/2020" , value: "Rechazado" },
    { id: 3, name: "Juan Fernando Pérez del Corral", date: "02/10/2021" , value: "Pendiente" },
    { id: 4, name: "Valentina Laverde de la Rosa", date: "02/10/2023" , value: "Rechazado" },
    { id: 5, name: "Óscar de la Renta", date: "02/10/2024" , value: "Pendiente" },
    { id: 6, name: "Sara Teresa Sánchez del Pinar", date: "02/10/2023" , value: "Pendiente" },
    { id: 7, name: "Efraín de las Casas Mejía", date: "02/10/2023" , value: "Pendiente" },
    { id: 8, name: "Julieta Ponce de León", date: "02/10/2024" , value: "Aprobado" },
    { id: 9, name: "Martín Elías de los Ríos Acosta", date: "02/10/2022" , value: "Rechazado" },
    { id: 10, name: "Gabriela de la Pava de la Torre", date: "02/10/2020" , value: "Pendiente" },
    { id: 11, name: "Matías de Greiff Rincón", date: "02/10/2023" , value: "Aprobado" },
    { id: 12, name: "Manuela del Pino Hincapié", date: "02/10/2021" , value: "Rechazado" },
    { id: 13, name: "Sebastián del Campo Yepes", date: "02/10/2021" , value: "Aprobado" },
  ];

  const itemsPerPage = 9; // Número de elementos por página
  const [activePage, setActivePage] = useState(1);

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <main className="containerRequests">
      <Sliderbar />
      <section className="bodyRequests">
        <header className="barRequests">
          <Search placeholder={"Buscar solicitud"} icon={<i class="fi fi-rr-search"></i>} />
        </header>
        <section className="tableRequests">
          <table className="table">
            <thead>
              <tr>
                <th className="headtable">N°</th>
                <th className="headtable">Solicitud</th>
                <th className="headtable">Fecha solicitud</th>
                <th className="headtable">Estado</th>
                <th className="headtable">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr className="trTable" key={item.id}>
                  <td className="bodytable">{item.id}</td>
                  <td className="bodytable">{item.name}</td>
                  <td className="bodytable">{item.date}</td>
                  <td className="bodytable">{item.value}</td>
                  <td className="bodytable" id="buttonRequests">
                    <Button title={"Detalles"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="aRequests">
          <Pagination activePage={activePage} itemsCountPerPage={itemsPerPage} totalItemsCount={data.length} pageRangeDisplayed={5} onChange={handlePageChange} />
        </section>
        <section className="footerRequest">
          <Footer />
        </section>
      </section>
    </main>
  );
};

export { Requests };
