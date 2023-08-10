import "./Create.css";
import React, { useState } from "react";
import { Footer } from "../Footer/Footer";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Button } from "../Utils/Button/Button";

const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Cerrar el dropdown después de seleccionar una opción
  };

  return (
    <main className="containerCreate">
      <Sliderbar />
      <section className="createContent">
        <header className="createHeader">
          <h1>Toda la información debe ser la registrada en Sofía Plus</h1>
          <section className="contentHeader">
            <section className="groupRadio">
              <section className="createRadio">
                <input type="radio" />
                <label htmlFor="" className="radioLebel">
                  Individual
                </label>
              </section>
              <section className="createRadio">
                <input type="radio" />
                <label htmlFor="" className="radioLebel">
                  Grupal
                </label>
              </section>
            </section>
            <section className="createDrop">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedOption ? selectedOption : "Coordinador"}
                <i class="fi fi-rr-angle-small-down" id="dropIcon"></i>
              </button>
              {isOpen && (
                <section className="dropdown-menu">
                  <ul className="create-ul">
                    <li onClick={() => handleOptionClick("Opción 1")}>Opción 1</li>
                    <li onClick={() => handleOptionClick("Opción 2")}>Opción 2</li>
                    <li onClick={() => handleOptionClick("Opción 3")}>Opción 3</li>
                    <li onClick={() => handleOptionClick("Opción 4")}>Opción 4</li>
                  </ul>
                </section>
              )}
            </section>
          </section>
        </header>
        <section className="bodyCreate">
          <section className="row">
            <section className="searchPerson">
              <section className="createSearch">
                <Search placeholder={"Buscar aprendiz"} icon={<i class="fi fi-br-search" id="iconSearch" />} />
                <section className="barCreate">
                  <p className="searchTitleCreate">Sin seleccionar aprendices</p>
                </section>
              </section>
              <section className="createSearch">
                <Search placeholder={"Buscar Instructor"} icon={<i class="fi fi-br-search" id="iconSearch" />} />
                <section className="barCreate">
                  <p className="searchTitleCreate">Sin seleccionar instructores</p>
                </section>
              </section>
            </section>
            <section className="content">
              <section className="containerTextarea">
                <p>Observaciones</p>
                <textarea className="textarea" name="" id="" cols="30" rows="5" placeholder="Añade tu obsevación" />
              </section>
              <section>hola</section>
            </section>
          </section>
          <section className="row">
            <section className="reglamento"> holi</section>
          </section>
          <section className="buttonCreate">
            <Button title={"Enviar"} icon={<i class="fi fi-br-check"></i>} />
          </section>
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Create };
