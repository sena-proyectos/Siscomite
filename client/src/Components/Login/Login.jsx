import './Login.css'
import { Footer } from '../Footer/Footer'
import Image from '../../assets/image/logoSena.png'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react' // Agregamos useState para manejar el estado de carga
import { login } from '../../api/httpRequest'
import { Toast } from '../toast/toast'
import Cookie from 'js-cookie'
import { Input } from '@nextui-org/react'
import React from 'react'
import { transform } from 'framer-motion'

export const Login = () => {
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [contrasena, setContrasena] = useState('')

  const [isLoading, setIsLoading] = useState(false) // Estado para controlar el estado de carga
  const [error, setError] = useState(null) // Estado para manejar los errores
  const navigate = useNavigate()

  const sendData = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const dataValue = {
      numero_documento: numeroDocumento,
      contrasena
    }

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

  const positions = ['outside']

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <main className="h-screen ">
      <section className="absolute top-11 left-11 " style={{ animation: 'show 0.8s ease-in-out' }}>
        <img src={Image} alt="Sena" className="w-[4rem]" />
      </section>
      {error && <Toast message={error} typeToast={'error'} onClose={closed} />}
      <section className="grid place-items-center  h-screen " style={{ animation: 'show 0.8s ease-in-out' }}>
        <form className="relative w-[400px] bg-white  p-[1rem] rounded-xl grid text-center shadow-lg place-items-center" onSubmit={sendData}>
          <h2 className="text-[1.5rem] font-bold mb-7">Iniciar Sesión</h2>
          <section className="grid w-[80%] gap-8  ">
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
              <Input type="text" label="Número documento" labelPlacement={'outside'} autoComplete="off" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
            </div>
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input
                label="Contraseña"
                autoComplete="off"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                labelPlacement={'outside'}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <i className="fi fi-rs-crossed-eye"></i> : <i className="fi fi-rr-eye"></i>}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-w-xs"
              />
            </div>

            <p className="text-sm">¿Olvidaste tu contraseña?</p>
            <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3" disabled={isLoading}>
              {/* Deshabilitamos el botón mientras se realiza el inicio de sesión */}
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <p className="text-sm">
              ¿Nuevo usuario?
              <Link className="text-sm text-[#587fff]" to={'/Register'}>
                Registrate
              </Link>
            </p>
          </section>
        </form>
      </section>
      <Footer />
    </main>
  );
};
