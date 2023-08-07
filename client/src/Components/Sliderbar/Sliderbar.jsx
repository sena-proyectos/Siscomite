import React, { useState } from "react";
import "./Sliderbar.css";
import { Link } from "react-router-dom";

const Sliderbar = () => {
  
  const [selectedIcon, setSelectedIcon] = useState(0);

  const handleIconClick = (iconId) => {
    setSelectedIcon(iconId);
  };

  return (
    <main className="sliderbar">
      <section className="top">
        <h3>Juan Gomez</h3>
        <p>Coordinador</p>
      </section>
      <section className="pages">
        <ul className="center">
          <Link to={"/home"} className="line">
            <li className={`part ${selectedIcon === 0 ? "active" : ""}`} onClick={() => setSelectedIcon(0)}>
              <i class="fi fi-rr-home" id="icon" title="Inicio" />
              <span className="slideText">Inicio</span>
            </li>
          </Link>
          <Link className="line" to={"/requests"}>
            <li className={`part ${selectedIcon === 2 ? "active" : ""}`} onClick={() => setSelectedIcon(2)}>
              <i class="fi fi-rs-file" id="icon" title="Solicitudes" />
              <span className="slideText"> Solicitudes </span>
            </li>
          </Link>
          <Link className="line" to={"/create"}>
            <li className={`part ${selectedIcon === 3 ? "active" : ""}`} onClick={() => setSelectedIcon(3)}>
              <i class="fi fi-rs-add-document" id="icon" title="Crear solicitud" />
              <span className="slideText">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line" to={"/groups"} >
            <li className={`part ${selectedIcon === 4 ? "active" : ""}`} onClick={() => setSelectedIcon(4)}>
              <i class="fi fi-rr-users" id="icon" title="Fichas" />
              <span className="slideText">Fichas</span>
            </li>
          </Link>
          <Link className="line">
            <li className="part">
              <i class="fi fi-rs-document" id="icon" title="Reglamento" />
              <span className="slideText">Reglamento</span>
            </li>
          </Link>
        </ul>
      </section>
      <section className="end">
        <ul className="down">
          <Link className="line">
            <li className="part">
              <i class="fi fi-rr-gears" id="icon" title="Configuración" />
              <span className="slideText">Configuración</span>
            </li>
          </Link>
          <li className="part">
            <i class="fi fi-rs-exit" id="icon" title="Cerrar sesión" />
            <span className="slideText">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export { Sliderbar };
