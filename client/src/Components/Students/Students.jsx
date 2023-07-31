import "./Students.css";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Card } from "../Utils/Card/Card";
import { Footer } from "../Footer/Footer";
import React, { useState } from "react";
import Pagination from "react-js-pagination";

const Students = () => {
  const cards = [
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
    { title: "Angie Tatiana Mosquera Arco", descripción: 123456789 },
  ];

  const itemsPerPage = 8; // Número de elementos por página
  const [activePage, setActivePage] = useState(1);

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <main className="containerStudent">
      <Sliderbar />
      <section className="junto">
        <header className="studentBar">
          <h2 className="titleStudent">Agregar Aprendiz</h2>
          <Search className="student_Bar" placeholder={"Busca un aprendiz"} icon={<i class="fi fi-rr-search"></i>} />
        </header>
        <section className="studentBody">
          {currentItems.map((item) => (
            <section className="studentCard" key={item.title}>
              <Card>{item.title} {item.descripción}</Card>
            </section>
          ))}
          <Pagination 
          activePage={activePage} 
          itemsCountPerPage={itemsPerPage} 
          totalItemsCount={cards.length} 
          pageRangeDisplayed={5} 
          onChange={handlePageChange} />
        </section>
        <Footer />
      </section>
      <section className="agregar">
        <button className="add">+</button>
      </section>
    </main>
  );
};

export { Students };
