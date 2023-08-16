import React, { useEffect, useState } from "react";
import "./Sliderbar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import jwt from "jwt-decode";

const Sliderbar = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState(null);

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = () => {
    const token = Cookie.get("token");
    const information = jwt(token);
    const nombres = information.nombres;
    const apellidos = information.apellidos;

    setNombreCompleto(`${nombres}  ${apellidos}`);
  };

  const logout = () => {
    Cookie.remove("token");
    navigate("/");
  };

  return (
    <main className="sliderbar">
      <section className="top">
        <h3>{nombreCompleto}</h3>
        <p>Coordinador</p>
      </section>
      <section className="pages">
        <ul className="center">
          <Link to={"/home"} className="line">
            <li className={`part ${selectedIcon === 0 ? "active" : ""}`} onClick={() => setSelectedIcon(0)}>
              <i className="fi fi-rr-home " id="icon" title="Inicio" />
              <span className="slideText">Inicio</span>
            </li>
          </Link>
          <Link className="line" to={"/requests"}>
            <li className={`part ${selectedIcon === 2 ? "active" : ""}`} onClick={() => setSelectedIcon(2)}>
              <i className="fi fi-rs-file" id="icon" title="Solicitudes" />
              <span className="slideText"> Solicitudes </span>
            </li>
          </Link>
          <Link className="line" to={"/create"}>
            <li className={`part ${selectedIcon === 3 ? "active" : ""}`} onClick={() => setSelectedIcon(3)}>
              <i className="fi fi-rs-add-document" id="icon" title="Crear solicitud" />
              <span className="slideText">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line" to={"/groups"}>
            <li className={`part ${selectedIcon === 4 ? "active" : ""}`} onClick={() => setSelectedIcon(4)}>
              <i className="fi fi-rr-users" id="icon" title="Fichas" />
              <span className="slideText">Fichas</span>
            </li>
          </Link>
          <Link className="line">
            <li className="part">
              <i className="fi fi-rs-document" id="icon" title="Reglamento" />
              <span className="slideText">Reglamento</span>
            </li>
          </Link>
        </ul>
      </section>
      <section className="end">
        <ul className="down">
          <Link className="line">
            <li className="part">
              <i className="fi fi-rr-gears" id="icon" title="Configuración" />
              <span className="slideText">Configuración</span>
            </li>
          </Link>
          <li className="part" onClick={logout}>
            <i className="fi fi-rs-exit" id="icon" title="Cerrar sesión" />
            <span className="slideText">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export { Sliderbar };
