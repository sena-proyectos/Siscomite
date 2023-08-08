import "./Card.css";
import React, { useState } from "react";

export const Card = ({ title, descripción, image, icon, depende = false, flip = false, header = false, click, frontContent, backContent }) => {
  return (
    <main className="containerCard" onClick={click}>
      {depende && (
        <section className="cardImage">
          <img className="fondoCard" src={image} alt="Imágen" />
        </section>
      )}
      <header className="cardTitle">
        {header && (
          <h4>
            {title}
            {icon}
          </h4>
        )}
      </header>
      <section className="cardBody">
        <p className="bodyText">{descripción}</p>
        {flip && (
          <section className="card_flip">
            <section className="front">{frontContent}</section>
            <section className="back">{backContent}</section>
          </section>
        )}
      </section>
    </main>
  );
};
