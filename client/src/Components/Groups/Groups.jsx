import { Link } from "react-router-dom";
import React from "react";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import "./Groups.css";

const Groups = () => {
  const cardData = [
    {
      id: 2345543,
      frontContent: "Análisis y Desarrollo de Software",
      backContent: "Back Content 1",
    },
    {
      id: 24567778,
      frontContent: "Multimedia",
      backContent: "Back Content 2",
    },
    {
      id: 2656666,
      frontContent: "Moda",
      backContent: "Back Content 2",
    },
    {
      id: 2344666,
      frontContent: "Diseño de interiores",
      backContent: "Back Content 2",
    },
    {
      id: 2344666,
      frontContent: "Diseño de interiores",
      backContent: "Back Content 2",
    },
    {
      id: 2344666,
      frontContent: "Diseño de interiores",
      backContent: "Back Content 2",
    },
    {
      id: 2344666,
      frontContent: "Diseño de interiores",
      backContent: "Back Content 2",
    },
  ];

  return (
    <main className="containerGroup">
      <Sliderbar />
      <section className="groupCentent">
        <header className="groupHeader">
          <Search placeholder={"Buscar ficha"} icon={<i className="fi fi-rr-search"></i>} />
        </header>
        <section className="bodyGroup">
          {cardData.map((card, id) => (
            <section className="card-content">
              <Link to={"/students"}>
                <Card flip key={id} frontContent={card.frontContent} backContent={card.backContent} />
              </Link>
            </section>
          ))}
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Groups };
