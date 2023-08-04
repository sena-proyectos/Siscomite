import "./Modal.css";
import { Button } from "../Button/Button";

export const Modal = ({ cerrarModal, titulo, modalAdd = false, modalInfo = false }) => {
  const closeModal = () => {
    cerrarModal();
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
                      Correo @soy.sena.edu.co
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
                      Número celular
                    </label>
                  </section>
                  <section className="modalInput">
                    <input type="email" name="email" className="inputModal" required placeholder=" " />
                    <label className="modalLabel" htmlFor="email">
                      Número fijo
                    </label>
                  </section>
                </section>
                <section className="modalArchivo">
                  <section className="modalInput">
                    <input type="file" name="archivo" id="inputArchivo" required placeholder=" " />
                    <label className="labelArchivo" htmlFor="archivo">
                      <i class="fi fi-rr-folder-upload" id="iconArchivo" />
                      Subir Excel
                    </label>
                  </section>
                  <section className="enviar">
                    <Button icon={<i className="fi fi-br-check" id="iconSave" />} title={"Guardar"} />
                  </section>
                </section>
              </section>
            )}

            {modalInfo && <p>Info</p>}
          </section>
        </section>
      </main>
    </>
  );
};
