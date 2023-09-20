import React, { useState } from 'react'
import './ForgotPassword.css'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [showVerification, setShowVerification] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleContinueClick = (e) => {
    e.preventDefault()
    // Aquí puedes implementar la lógica para enviar el correo y recibir el código de verificación
    // Una vez tengas el código de verificación, puedes mostrar la siguiente sección
    setShowVerification(true)
  }

  return (
    <>
      <main className="h-screen">
        <section className="absolute top-11 left-11">
          <img src="image/logoSena.webp" alt="Sena" className="w-[4rem]" />
        </section>
        <section className="grid place-items-center h-screen ">
          <form className="relative w-[25rem] bg-white p-[1rem] rounded-xl grid shadow-lg place-items-center form">
            <h2 className="text-[1.5rem] mb-[2rem] font-bold">Recuperar contraseña</h2>
            {showVerification ? (
              <section className="grid gap-7 w-[80%]">
                <p className="text-sm text-default-400">Ingresa el código de verificación de 6 dígitos enviado a tu correo electrónico.</p>

                <Input isRequired type="number" labelPlacement="outside" label="Código de Verificación" />

                <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3" onClick={() => {}}>
                  Cambiar Contraseña
                </button>
              </section>
            ) : (
              <section className="grid gap-4 w-[80%]">
                <p className="text-sm text-default-400">Ingresa tu correo electrónico para enviar la confirmación y el código para el cambio de contraseña.</p>

                <Input isRequired type="email" labelPlacement="outside" label="Ingresa tu correo" value={email} onChange={handleEmailChange} description="We'll never share your email with anyone else." />

                <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3" onClick={handleContinueClick}>
                  Continuar
                </button>
              </section>
            )}
            <p className="text-sm cursor-pointer mt-3">
              Volver a 
              <Link to="/" className="text-[#587fff] ml-1">
                Inicio de sesión
              </Link>
            </p>
          </form>
        </section>
      </main>
    </>
  )
}

export { ForgotPassword }
