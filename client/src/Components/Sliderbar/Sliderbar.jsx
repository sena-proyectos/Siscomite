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
              <i class="fi fi-rr-home" title="Inicio"  />
              <span className="slideText">Inicio</span>
            </li>
          </Link>
            <Link className="line">
          <li className="part">
              <i class="fi fi-rr-user" title="Aprendices" />
              <span className="slideText">Aprendices</span>
          </li>
            </Link>
            <Link className="line">
          <li className="part">
              <i class="fi fi-rs-file" title="Solicitudes" />
              <span className="slideText">Solicitudes </span>
          </li>
            </Link>
            <Link className="line">
          <li className="part">
              <i class="fi fi-rs-add-document" title="Crear solicitud" />
              <span className="slideText">Crear solicitud</span>
          </li>
            </Link>
            <Link className="line">
          <li className="part">
              <i class="fi fi-rr-users" title="Fichas" />
              <span className="slideText">Fichas</span>
          </li>
            </Link>
            <Link className="line">
          <li className="part">
              <i class="fi fi-rs-document" title="Reglamento" />
              <span className="slideText">Reglamento</span>
          </li>
            </Link>
        </ul>
      </section>
      <section className="end">
        <ul className="down">
            <Link className="line">
          <li className="part">
              <i class="fi fi-rr-gears" title="Configuración" />
              <span className="slideText">Configuración</span>
          </li>
            </Link>
          <li className="part">
            <i class="fi fi-rs-exit" title="Cerrar sesión" />
            <span className="slideText">Cerrar sesión</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export { Sliderbar };
