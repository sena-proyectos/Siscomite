import React, { useEffect, useState } from "react";
import "./Sliderbar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import jwt from "jwt-decode";
import { useLocation } from "react-router-dom";

// Para poner color al icon al seleccionarlo

// Función para saber si la ruta esta activa
const isActiveRoute = (currentPath, targetPath) => {
  return currentPath === targetPath;
};

const Sliderbar = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState(null);

  //Para poner color al icon al seleccionarlo
  const location = useLocation(); // Importa useLocation

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
    <main className="sliderbar bg-[#2e323e] m-[1rem] w-[18%]  h-[95vh] relative rounded-2xl text-white flex-col flex items-center ">
      <section className="top flex flex-col items-center p-[30px] text-center w-full">
        <h3 className="mt-[1rem] text-[17px] font-bold">{nombreCompleto}</h3>
        <p>Coordinador</p>
      </section>
      <section className="pages absolute top-[35%]  w-full flex justify-center">
        <ul className="p-0">
          <Link to={"/home"} className="line">
            <li className="relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className={`fi fi-rr-home ${isActiveRoute(location.pathname, "/home") ? "text-red-500" : ""}`} title="Inicio" />
              <span className="slideText ml-[10px]">Inicio</span>
            </li>
          </Link>

          <Link to={"/requests"} className="line">
            <li className="relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className={`fi fi-rs-file ${isActiveRoute(location.pathname, "/requests") ? "text-red-500" : ""}`} title="Solicitudes" />
              <span className="slideText ml-[10px]"> Solicitudes </span>
            </li>
          </Link>

          <Link className="line" to={"/create"}>
            <li className="relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className={`fi fi-rs-add-document ${isActiveRoute(location.pathname, "/create") ? "text-red-500" : ""}`} title="Crear solicitud" />
              <span className="slideText ml-[10px]">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line" to={"/groups"}>
            <li className="relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className={`fi fi-rr-users ${isActiveRoute(location.pathname, "/groups") ? "text-red-500" : ""}`} title="Fichas" />
              <span className="slideText ml-[10px]">Fichas</span>
            </li>
          </Link>
          <Link className="line" to={"/rules"}>
            <li className="relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className={`fi fi-rs-document ${isActiveRoute(location.pathname, "/rules") ? "text-red-500" : ""}`} title="Reglamento" />
              <span className="slideText ml-[10px]">Reglamento</span>
            </li>
          </Link>
        </ul>
      </section>
      <section className="absolute bottom-[0.5em]">
        <ul className="p-0 flex flex-col items-center justify-end mb-[20px]">
          <Link className="line">
            <li className=" relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]">
              <i className="fi fi-rr-gears" id="icon" title="Configuración" />
              <span className="slideText ml-[10px]">Configuración</span>
            </li>
          </Link>
          <li className="part relative mb-[10px] rounded-lg px-2 py-1 hover:bg-[#1a1d24]" onClick={logout}>
            <i className="fi fi-rs-exit" id="icon" title="Cerrar sesión" />
            <span className="slideText ml-[10px] cursor-pointer">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export { Sliderbar };
