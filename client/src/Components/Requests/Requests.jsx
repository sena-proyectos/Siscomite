import "./Requests.css";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Button } from "../Utils/Button/Button";

const Requests = () => {
  const data = [
    { id: 1, name: "Dato 1", value: 100 },
    { id: 2, name: "Dato 2", value: 200 },
    { id: 3, name: "Dato 3", value: 300 },
    { id: 4, name: "Dato 4", value: 400 },
    { id: 5, name: "Dato 5", value: 500 },
    { id: 6, name: "Dato 6", value: 600 },
    { id: 7, name: "Dato 7", value: 700 },
    { id: 8, name: "Dato 8", value: 800 },
    { id: 9, name: "Dato 9", value: 900 },
    { id: 10, name: "Dato 10", value: 1000 },
  ];

  const itemsPerPage = 6; // Número de elementos por página
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
