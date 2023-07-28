import "./User.css";
import { Link } from "react-router-dom";
// import image from "../../assets/image/imageLogin.png";

const User = () => {
  return (
    <main className="containerLogin">
      <section className="main">
        <form className="loginForm">
          <h2 className="title">Iniciar Sesión</h2>
          <section className="formContainer">
            <section className="inp">
              <input type="text" name="document" className="formInput" placeholder=" " />
              <label className="formLabel" htmlFor="document">
                Número de documento
              </label>
            </section>
            <section className="inp">
              <input type="password" name="password" className="formInput" placeholder=" " />
              <label className="formLabel" htmlFor="password">
                Contraseña
              </label>
            </section>
            <p className="text">
              <a href="" className="text">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
            <button className="btn">
              {" "}
              <Link to={"/Home"}>Iniciar sesión</Link>{" "}
            </button>
            <p className="textForm">
              ¿Nuevo usuario?{" "}
              <Link className="text" to={"/Register"}>
                Registrate
              </Link>
            </p>
          </section>
        </form>
        {/* <section className="loginImageForm">
          <img src={image} alt="Login" className="image" />
        </section> */}
      </section>
    </main>
  );
};

export { User };
