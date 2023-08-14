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
  const numero_documento = useRef()
  const contrasena = useRef()
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar el estado de carga
  const [error, setError] = useState(null) // Estado para manejar los errores
  const navigate = useNavigate()

  const sendData = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const dataValue = {
      numero_documento: numero_documento.current.value,
      contrasena: contrasena.current.value,
    }

    try {
      const res = await login(dataValue)
      const response = res.data.response.info.token
      Cookie.set('token', response, { expires: 2, secure: true, sameSite: 'None', path: '/' })
      setError(null)
      navigate('/home')
    } catch (error) {
      const message = error.response.data.message
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const closed = () => {
    setError(null)
  }

  const positions = ['outside']

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <main className="container ">
      <section className="absolute flex items-center w-12 top-10 left-12" style={{ animation: 'show 0.8s ease-in-out' }}>
        <img src={Image} alt="Sena" />
      </section>
      <section className="flex items-center justify-center w-full h-screen ">
        <form className="relative bg-white w-[30%] p-[1rem] rounded-xl grid text-center shadow-lg place-items-center" onSubmit={sendData}>
          <h2 className="text-[1.5rem] font-bold mb-7">Iniciar Sesión</h2>
          <section className="grid w-[80%] gap-7">
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
              <Input type="text" label="Número documento" labelPlacement={'outside'} autoComplete="off" ref={numero_documento} />
            </div>
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input
                label="Contraseña"
                labelPlacement={'outside'}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <i class="fi fi-rs-crossed-eye"></i> : <i class="fi fi-rr-eye"></i>}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-w-xs"
                autoComplete="off"
                ref={contrasena}
              />
            </div>

            <p className="text-sm">¿Olvidaste tu contraseña?</p>
            <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3" disabled={isLoading}>
              {/* Deshabilitamos el botón mientras se realiza el inicio de sesión */}
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
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
      {/* <Footer /> */}
    </main>
  )
}
