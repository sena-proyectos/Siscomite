import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({ title, descripción, image, depende = false }) => {
  return (
    <main className="containerCard">
      {depende && (
        <section className="cardImage">
          <img className="fondoCard" src={image} alt="Imágen" />
        </section>
      )}
      <header className="cardTitle">
        <h4>{title}</h4>
      </header>
      <section className="cardBody">
        <p className="bodyText">{descripción}</p>
      </section>
    </main>
  );
};
