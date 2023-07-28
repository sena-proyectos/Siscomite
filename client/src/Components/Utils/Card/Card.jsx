import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({ title, descripción, image }) => {
  return (
    <main className="containerCard">
      <section className="cardImage">
        <img className="fondoCard" src={image} alt="Fondo" />
      </section>
      <header className="cardTitle">
        <h3>{title}</h3>
      </header>
      <section className="cardBody">
        <p className="bodyText">{descripción}</p>
      </section>
    </main>
  );
};
