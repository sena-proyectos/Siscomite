import "./Register.css";
import { Link } from "react-router-dom";
// import image from "../../assets/image/register.png";

const Register = () => {
  return (
    <main className="containerRegister">
      <section className="main">
        <form className="registerForm">
          <h2 className="title">Crear una cuenta</h2>
          <section className="formContainerR">
            <section className="inputGroup">
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " />
                <label className="formLabel" htmlFor="document">
                  Nombre
                </label>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " />
                <label className="formLabel" htmlFor="document">
                  Apellido
                </label>
              </section>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " />
              <label className="formLabel" htmlFor="document">
                Correo institucional
              </label>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " />
              <label className="formLabel" htmlFor="document">
                Teléfono
              </label>
            </section>

            <section className="inputGroup">
              <section className="inpu">
                <select className="formSelect">
                  <option value="">Tipo de documento</option>
                  <option value="">CC</option>
                  <option value="">TI</option>
                  <option value="">PE</option>
                </select>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " />
                <label className="formLabel" htmlFor="document">
                  Documento
                </label>
              </section>
            </section>

            <section className="inp">
              <input type="password" name="password" className="formInputRe" placeholder=" " />
              <label className="formLabel" htmlFor="password">
                Contraseña
              </label>
            </section>

            <button className="btn">Registrate</button>
            <p className="textForm">
              ¿Ya estas registrado?{" "}
              <Link className="text" to={"/"}>
                Iniciar sesión
              </Link>
            </p>
          </section>
        </form>
      </section>
    </main>
  );
};

export { Register };
