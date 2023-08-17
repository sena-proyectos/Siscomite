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
    <main className="sliderbar bg-[#2e323e] m-[1rem] w-[18%]  h-[95vh] relative rounded-2xl text-white flex-col flex items-center ">
      <section className="top flex flex-col items-center p-[30px] text-center w-full">
        <h3 className="mt-[1rem] text-[17px] font-bold">{nombreCompleto}</h3>
        <p>Coordinador</p>
      </section>
      <section className="pages absolute top-[35%]  w-full flex justify-center">
        <ul className="p-0">
          <Link to={"/home"} className="line">
            <li className="relative mb-[15px]  rounded-xl " >
              <i className="fi fi-rr-home " id="icon" title="Inicio" />
              <span className="slideText ml-[10px]">Inicio</span>
            </li>
          </Link>
          <Link className="line" to={"/requests"}>
            <li className="relative mb-[15px] rounded-xl ">
              <i className="fi fi-rs-file" id="icon" title="Solicitudes" />
              <span className="slideText ml-[10px]"> Solicitudes </span>
            </li>
          </Link>
          <Link className="line" to={"/create"}>
            <li className="relative mb-[15px] rounded-xl ">
              <i className="fi fi-rs-add-document" id="icon" title="Crear solicitud" />
              <span className="slideText ml-[10px]">Crear solicitud</span>
            </li>
          </Link>
          <Link className="line" to={"/groups"}>
            <li className="relative mb-[15px] rounded-xl ">
              <i className="fi fi-rr-users" id="icon" title="Fichas" />
              <span className="slideText ml-[10px]">Fichas</span>
            </li>
          </Link>
          <Link to={"/rules"} className="line">
            <li className="relative mb-[15px] rounded-xl ">
              <i className="fi fi-rs-document" id="icon" title="Reglamento" />
              <span className="slideText ml-[10px]">Reglamento</span>
            </li>
          </Link>
        </ul>
      </section>
      <section className="absolute bottom-[0.5em]">
        <ul className="p-0 flex flex-col items-center justify-end mb-[20px]">
          <Link className="line">
            <li className=" mb-[15px]">
              <i className="fi fi-rr-gears" id="icon" title="Configuración" />
              <span className="slideText ml-[10px]">Configuración</span>
            </li>
          </Link>
          <li className="part" onClick={logout}>
            <i className="fi fi-rs-exit" id="icon" title="Cerrar sesión" />
            <span className="slideText ml-[10px] cursor-pointer">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export { Sliderbar };