import React, { useState } from "react";
import "./Sliderbar.css";
import { Link, useLocation } from "react-router-dom";


const Sliderbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [selectedIcon, setSelectedIcon] = useState("");

  
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
            <li className={`part ${selectedIcon === "home" ? "active" : ""}`} onClick={() => handleIconClick("home")}>
              <i class="fi fi-rr-home" id="icon" title="Inicio" />
              <span className="slideText">Inicio</span>
            </li>
          </Link>
          <Link className="line" to={"/students"}>
            <li className={`part ${selectedIcon === "students" ? "active" : ""}`} onClick={() => handleIconClick("students")}>
              <i class="fi fi-rr-user" id="icon" title="Aprendices" />
              <span className="slideText">Aprendices</span>
            </li>
          </Link>
          <Link className="line" to={"/requests"}>
            <li className={`part ${selectedIcon === "requests" ? "active" : ""}`} onClick={() => handleIconClick("requests")}>
              <i class="fi fi-rs-file" id="icon" title="Solicitudes" />
              <span className="slideText"> Solicitudes </span>
            </li>
          </Link>
          <Link className="line" to={"/create"}>
            <li className={`part ${selectedIcon === "create" ? "active" : ""}`} onClick={() => handleIconClick("create")} >
              <i class="fi fi-rs-add-document" id="icon" title="Crear solicitud" />
              <span className="slideText">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line">
            <li className="part">
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
