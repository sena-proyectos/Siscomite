import "./Card.css";

export const Card = ({ title, descripciónHome, titleHome, descripción, image, icon, flip = false, header = false, click, inside = false, frontContent, backContent }) => {
  return (
    <main className="containerCard" onClick={click}>
      <header className="cardTitle">
        {header && (
          <h4 className="card_title">
            {title}
            {icon}
          </h4>
        )}
      </header>
      <section className="card_Body">

        {inside && (

          <section className="cardHome">
            <section className="cardImage">
              <img className="fondoCard" src={image} alt="Imágen" lazyloading/>
              <div className="textoImagen">
                <h4>{titleHome}</h4>
                <p className="bodyText">{descripciónHome}</p>
              </div>
            </section>
          </section>
        )}
        <p className="bodyText">{descripción}</p>

        
        {flip && (
          <section className="card_flip">
            <section className="front ">{frontContent}</section>
            <section className="back border-2 border-blue-200 ">
              <ul className="list">
                {backContent.map((item, index) => (
                  <li key={index} className="listItem ">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </section>
        )}
      </section>
    </main>
  );
};
