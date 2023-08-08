import "./Students.css";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Card } from "../Utils/Card/Card";
import { Footer } from "../Footer/Footer";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { Modal } from "../Utils/Modal/Modal";

const Students = () => {
  const cards = [
    { title: "Angie Tatiana Mosquera Arco", descripción: 1 },
    { title: "Mariano Lore Florez Azul", descripción: 2 },
    { title: "Guillermo Stiven Bejumeda Morales", descripción: 3 },
    { title: "Lorena Quiceno Giraldo", descripción: 4 },
    { title: "Juan Guillermo Gomez Zapata", descripción: 5 },
    { title: "Mariano Lopez Robledo Estrada", descripción: 6 },
    { title: "Mariana Lucia Perez Carol", descripción: 7 },
    { title: "Estaban Quito Romero Suarez", descripción: 8 },
    { title: "Luna Lunera Roble Maria", descripción: 9 },
    { title: "Carla María Tibetano De Espana", descripción: 10 },
  ];

  const itemsPerPage = 12; // Número de elementos por página
  const [activePage, setActivePage] = useState(1);

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [modalStudent, setModalStudent] = useState(false);
  const modalAdd = () => {
    setModalStudent(!modalStudent);
  };

  const [infoStudents, setInfoStudents] = useState(false);
  const infoStudent = () => {
    setInfoStudents(!infoStudents);
  };

  return (
    <>
      {modalStudent && <Modal modalAdd cerrarModal={modalAdd} titulo={"Agregar Estudiantes"} />}
      {infoStudents && <Modal modalInfo cerrarModal={infoStudent} titulo={"Información"}/>}

      <main className="containerStudent">
        <Sliderbar />
        <section className="junto">
          <header className="studentBar">
            <Search className="student_Bar" placeholder={"Busca un aprendiz"} />
          </header>
          <section className="studentBody">
            {currentItems.map((item) => {
              return (
                <section className="studentCard" key={item.title}>
                  <Card click={infoStudent} title={item.title} descripción={item.descripción} />
                </section>
              );
            })}
          </section>
          <section className="aStudents">
            <Pagination activePage={activePage} itemsCountPerPage={itemsPerPage} totalItemsCount={cards.length} pageRangeDisplayed={5} onChange={handlePageChange} />
          </section>
        <section className="footerStudents">
          <Footer />
        </section>
        </section>
        <section className="agregar">
          <button className="add" onClick={modalAdd}>
            +
          </button>
        </section>
      </main>
    </>
  );
};

export { Students };
