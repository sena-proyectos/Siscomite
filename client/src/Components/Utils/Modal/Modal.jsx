import "./Modal.css";
import React, { useState } from "react";
import { Button } from "../Button/Button";

export const Modal = ({ cerrarModal, titulo, modalAdd = false, modalInfo = false, modalAddGroups = false }) => {
  const closeModal = () => {
    cerrarModal();
  };

    const [isTrimestreEnabled, setIsTrimestreEnabled] = useState(false);
  
    const handleEtapaChange = (event) => {
      const selectedValue = event.target.value;
      setIsTrimestreEnabled(selectedValue === "lectiva");
    };

  return (
    <>
      <main className="fondo">
        <section className="containerModal">
          <header className="headerModal">
            <h3>{titulo}</h3>
            <i className="fi fi-br-cross" onClick={closeModal} id="iconModal" />
          </header>
          <section className="bodyModal">
            {modalAdd && (
              <section className="modalAdd">
                <section className="modalContent">
                  <section className="modalInput">
                    <input type="text" name="fistName" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="fistName">
                      Nombre
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="text" name="lastName" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="lastName">
                      Apellido
                    </label>
                  </section>

                  <select className="modalSelect" required>
                    <option value="">Tipo de documento</option>
                    <option value="">CC</option>
                    <option value="">TI</option>
                    <option value="">PE</option>
                  </select>

                  <section className="modalInput">
                    <input type="text" name="document" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="document">
                      Número de documento
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="email" name="emailSena" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="emailSena">
                      Correo institucional
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="email" name="email" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="email">
                      Correo alterno
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="email" name="email" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="email">
                      Número
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="email" name="email" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="email">
                      Número alterno
                    </label>
                  </section>
                </section>
                <section className="modalArchivo">
                  <section className="modalInput">
                    <label className="labelArchivo">
                      <i class="fi fi-rr-folder-upload" id="iconArchivo" />
                      Subir Excel
                      <input type="file" name="archivo" id="inputArchivo" required />
                    </label>
                  </section>
                  <section className="enviar">
                    <Button icon={<i className="fi fi-br-check" id="iconSave" />} title={"Guardar"} />
                  </section>
                </section>
              </section>
            )}

            {modalInfo && (
              <section className="modalInfo">
                <section className="contentInfo">
                  <section className="info">
                    <span className="infoTitle">Nombre completo</span>
                    <p className="infoText">Mariana Lopez Robledo Estrada</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Tipo de documento</span>
                    <p className="infoText">Cédula de ciudadanía</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número de documento</span>
                    <p className="infoText">12345678</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Correo institucional</span>
                    <p className="infoText">mariana34@soy.sena.edu.co</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Correo Alterno</span>
                    <p className="infoText">marinalopez@gmail.com</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número</span>
                    <p className="infoText">3245555555</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número alteno</span>
                    <p className="infoText">6666666</p>
                  </section>
                </section>
              </section>
            )}

            {modalAddGroups && (
              <section className="modalGrup">
                <section className="contentGroup">
                  <section className="modalInput">
                    <input type="text" name="fistName" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="fistName">
                      Número de ficha
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="text" name="fistName" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="fistName">
                      Nombre del programa
                    </label>
                  </section>
                  <section>
                    <select className="modalSelect" required>
                      <option value="">Jornada</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                      <option value="Noche">Fines de semana</option>
                      <option value="Noche">Virtual</option>
                    </select>
                  </section>
                  <section>
                    <select className="modalSelect" required onChange={handleEtapaChange}>
                      <option value="">Etapa</option>
                      <option value="lectiva">Lectiva</option>
                      <option value="practica">Práctica</option>
                    </select>
                  </section>
                  <section>
                    <select className="modalSelect" required disabled={!isTrimestreEnabled}>
                      <option value="">Trimestre lectivo</option>
                      <option value="lectiva">1</option>
                      <option value="practica">2</option>
                      <option value="practica">3</option>
                      <option value="practica">4</option>
                      <option value="practica">5</option>
                      <option value="practica">6</option>
                    </select>
                  </section>
                  <select className="modalSelect" required>
                    <option value="">Modalidad</option>
                    <option value="vitual">Vitual</option>
                    <option value="presencial">Presencial</option>
                    <option value="media_tecnica">Media Técnica</option>
                    <option value="distancia">A distancia</option>
                    <option value="virtual">Virtual</option>
                  </select>
                  <section className="enviarGroup">
                    <Button icon={<i className="fi fi-br-check" id="iconSave" />} title={"Guardar"} />
                  </section>
                </section>
              </section>
            )}
          </section>
        </section>
      </main>
    </>
  );
};
