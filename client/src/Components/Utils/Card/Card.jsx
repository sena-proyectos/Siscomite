import "./Card.css";

export const Card = ({ title, descripción, image, depende = false, click }) => {
  return (
    <main className="containerCard" onClick={click} >
      {depende && (
        <section className="cardImage">
          <img className="fondoCard" src={image} alt="Imágen" />
        </section>
      )}
      <header className="cardTitle">
        <h4>{title} </h4>
      </header>
      <section className="cardBody">
        <p className="bodyText">{descripción}</p>
      </section>
    </main>
  );
};
