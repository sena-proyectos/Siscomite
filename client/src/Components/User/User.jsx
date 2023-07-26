import "./User.css";
import { Link } from "react-router-dom";
import image from "../../assets/image/imageLogin.png";

function User() {
  return (
    <section className="container">
      <div className="main">
        <form className="loginForm">
        <h2 className="title">Iniciar Sesión</h2>
          <div className="inp">
            <input type="text" placeholder="Número de documento" />
          </div>
          <div className="inp">
            <input type="password" placeholder="Contraseña" />
          </div>
          <p>
            <a href="">¿Olvidaste tu contraseña?</a>
          </p>
          <div className="btn">
            <button>Iniciar sesión</button>
          </div>
          <p>
            ¿Nuevo usuario? <Link to={"/Register"}>Registrate</Link>
          </p>
        </form>

        <figure className="loginImg">
          <img src={image} alt="Login" />
        </figure>
      </div>
    </section>
  );
}

export { User };
