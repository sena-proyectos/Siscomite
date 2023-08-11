import "./Login.css";
import { Footer } from "../Footer/Footer";
import Image from "../../assets/image/logoSena.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react"; // Agregamos useState para manejar el estado de carga
import { login } from "../../api/httpRequest";
import { Toast } from "../toast/toast";
import Cookie from "js-cookie";
import { Input } from "@nextui-org/react";
import React from "react";

export const Login = () => {
  const numero_documento = useRef();
  const contrasena = useRef();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar los errores
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const dataValue = {
      numero_documento: numero_documento.current.value,
      contrasena: contrasena.current.value,
    };

    try {
      const res = await login(dataValue);
      const response = res.data.response.info.token;
      Cookie.set("token", response, { expires: 2, secure: true, sameSite: "None", path: "/" });
      setError(null);
      navigate("/home");
    } catch (error) {
      const message = error.response.data.message;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const closed = () => {
    setError(null);
  };

  const positions = ["outside"];

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="container ">
      <section className="logo ">
        <img src={Image} alt="Sena" />
      </section>
      <section className="mainLogin">
        <form className="loginForm" onSubmit={sendData}>
          <h2 className="title">Iniciar Sesión</h2>
          {error && <Toast message={error} typeToast={"error"} onClose={closed} />}
          <section className="formContainer">
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
              <Input type="text" label="Número documento" labelPlacement={"outside"} autoComplete="off" ref={numero_documento} />
            </div>
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input
                label="Contraseña"
                labelPlacement={"outside"}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <i class="fi fi-rs-crossed-eye"></i> : <i class="fi fi-rr-eye"></i>}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
                autoComplete="off"
                ref={contrasena}
              />
            </div>

            <p className="text">¿Olvidaste tu contraseña?</p>
            <button className="btn" disabled={isLoading}>
              {/* Deshabilitamos el botón mientras se realiza el inicio de sesión */}
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <p className="textForm">
              ¿Nuevo usuario?
              <Link className="text" to={"/Register"}>
                Registrate
              </Link>
            </p>
          </section>
          <Footer />
        </form>
      </section>
    </main>
  );
};
