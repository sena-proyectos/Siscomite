import "./Sliderbar.css";
import { Link } from "react-router-dom";

const Sliderbar = () => {
  return (
    <main className="sliderbar">
      <section className="top">
        <h3>Juan Gomez</h3>
        <p>Coordinador</p>
      </section>
      <section className="pages">
        <ul className="center">
          <Link to={"/Home"} className="line">
            <li className="part">
              <i class="fi fi-rr-home" id="icon" title="Inicio" />
              <span className="slideText">Inicio</span>
            </li>
          </Link>
          <Link className="line" to={"/Students"}>
            <li className="part">
              <i class="fi fi-rr-user" id="icon" title="Aprendices" />
              <span className="slideText">Aprendices</span>
            </li>
          </Link>
          <Link className="line" to={"/Requests"}>
            <li className="part">
              <i class="fi fi-rs-file" id="icon" title="Solicitudes" />
              <span className="slideText"> Solicitudes </span>
            </li>
          </Link>
          <Link className="line">
            <li className="part">
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
