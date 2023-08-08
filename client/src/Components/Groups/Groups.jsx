import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Modal } from "../Utils/Modal/Modal";
import "./Groups.css";

const Groups = () => {
  const cardData = [
    {
      id: 2345543,
      frontContent: "Análisis y Desarrollo de Software",
      backContent: ["Maria Juana Perez", "Presencial", "Tarde"],
    },
    {
      id: 24567778,
      frontContent: "Multimedia",
      backContent: ["Lorena Sofía Ramirez ", "Virtual", "Mañana"],
    },
    {
      id: 2656666,
      frontContent: "Moda",
      backContent: ["Item 1", "Item 2", "Item 3"],
    },
    {
      id: 2344666,
      frontContent: "Diseño de interiores",
      backContent: ["Item 1", "Item 2", "Item 3"],
    },
  ];

  const [modalGroups, setModalGroups] = useState(false);
  const modalAddGroups = () => {
    setModalGroups(!modalGroups);
  };

  return (
    <>
      {modalGroups && <Modal modalAddGroups cerrarModal={modalAddGroups} titulo={"Agregar Fichas"} />}

      <main className="containerGroup">
        <Sliderbar />
        <section className="groupCentent">
          <header className="groupHeader">
            <Search placeholder={"Buscar ficha"} icon={<i className="fi fi-rr-search"></i>} />
          </header>
          <section className="bodyGroup">
            {cardData.map((card) => (
              <section className="card-content">
                <Link to={"/students"}>
                  <Card
                    flip
                    key={card.id}
                    frontContent={
                      <section>
                        <p className="id">{card.id}</p>
                        <p>{card.frontContent}</p>
                      </section>
                    }
                    backContent={card.backContent.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  />
                </Link>
              </section>
            ))}
          </section>
          <section className="agregar" onClick={modalAddGroups}>
            <button className="add">+</button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export { Groups };
