import "./Register.css";
import { Link } from "react-router-dom";
import image from "../../assets/image/register.png";

function Register() {
  return (
    <section className="container">
      <div className="main">
        <form className="loginForm">
          <h2 className="title">Crea una cuenta</h2>
          <div className="group">
            <div className="inp">
              <input type="text" placeholder="Nombres" />
            </div>
            <div className="inp">
              <input type="text" placeholder="Apellidos" />
            </div>
          </div>
          <div className="inp">
            <input type="email" placeholder="Correo institucional" />
          </div>
          <div className="inp">
            <input type="text" placeholder="Número de teléfono" />
          </div>
          <div className="group">
            <div className="inp">
              {/* <label for="lang">Tipo de documento</label> */}
              <select name="lenguajes" id="lang">
                <option value="cedula">Tipo de documento</option>
                <option value="cedula">CC</option>
                <option value="tarjetaIdentida">TI</option>
                <option value="pasaporte">PES</option>
              </select>
            </div>
            <div className="inp">
              <input type="text" placeholder="Documento" />
            </div>
          </div>
          <div className="inp">
            <input type="password" placeholder="Contraseña" />
          </div>

          <div className="btn">
            <button>Registrate</button>
          </div>
          <p>
            ¿Ya tienes una cuenta? <Link to={"/"}>Iniciar Sesión</Link>
          </p>
        </form>

        <figure className="registerImg">
          <img src={image} alt="Reister" />
        </figure>
      </div>
    </section>
  );
}

export { Register };
