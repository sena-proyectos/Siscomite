import "./Create.css";
import React, { useState } from "react";
import { Footer } from "../Footer/Footer";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";

const Create = () => {
 



  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAprendizOption, setSelectedAprendizOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Cerrar el dropdown después de seleccionar una opción
  };

  const handleAprendizOptionClick = (option) => {
    setSelectedAprendizOption(option);
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
                    <li onClick={() => handleOptionClick("Marianela Henao Atehortua")}>Marianela Henao Atehortua</li>
                    <li onClick={() => handleOptionClick("Jaime León Vergara Areiza")}>Jaime León Vergara Areiza</li>
                    <li onClick={() => handleOptionClick("Sergio Soto Henao")}>Sergio Soto Henao</li>
                    <li onClick={() => handleOptionClick("Mauro Isaías Arango Vanegas")}>Mauro Isaías Arango Vanegas</li>
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
                <Search className="bar_create" placeholder={"Buscar aprendiz"} icon={<i class="fi fi-br-search" id="iconSearch"/>} onSelect={handleAprendizOptionClick}/>
                <section className="barCreate">
                  <p className="searchTitleCreate">{selectedAprendizOption ? `Aprendiz seleccionado: ${selectedAprendizOption}` : "Sin seleccionar aprendices"}</p>
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
              <section className="createFile">
                <section className="file">
                  <label className="custom-file-input">
                    Subir evidencia
                    <i class="fi fi-rr-upload" id="iconFile"></i>
                    <input type="file" id="inputFile" />
                  </label>
                </section>
              </section>
            </section>
          </section>
          <section className="row">
            <section className="reglamentoContent">
              <section className="reglamento">holi</section>
            </section>
          </section>
          {/* <section className="buttonCreate">
            <Button title={"Enviar"} icon={<i class="fi fi-br-check"></i>} />
          </section> */}
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Create };
