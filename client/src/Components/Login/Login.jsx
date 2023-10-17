/* Importaciones de modulos y componentes */
import './Login.css'
import { useState } from 'react' // Agregamos useState para manejar el estado de carga
import { Footer } from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/httpRequest'
import Cookie from 'js-cookie'
import { Input } from '@nextui-org/react'
import { Toaster, toast } from 'sonner'
import { validationLogin } from '../../Validations/validations'

export const Login = () => {
  /* Estados para los valores de los campos */
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [contrasena, setContrasena] = useState('')

  // Estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()

  const toggleVisibility = () => setIsVisible(!isVisible)

  /* Funcion para enviar los datos del inicio de sesion al servidor */
  const sendData = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const dataValue = {
      numero_documento: numeroDocumento,
      contrasena
    }

    try {
      // Realiza la validación de los datos utilizando la función "validate" de "validationLogin".
      const { error } = validationLogin.validate(dataValue)
      // Verifica si hay un error de validación.
      if (error) {
        // Convierte el objeto "error" a una cadena de texto.
        const errorString = String(error)
        // Comprueba si el error contiene la cadena 'numero_documento'.
        const errorMsg = errorString.includes('numero_documento')
        if (errorMsg) {
          toast.error('El número de documento no es válido, verifíquelo')
          // Lanza una excepción para detener la ejecución.
          throw new Error()
        }
        // Si el error no está relacionado con 'numero_documento', muestra un mensaje de error de contraseña incorrecta.
        toast.error('La contraseña no es correcta, verifíquelo')
        // Lanza una excepción para detener la ejecución.
        throw new Error()
      }
      // Si no hubo errores de validación, procede con la autenticación.
      const res = await login(dataValue)
      const response = res.data.response.info.token
      // Establece la cookie del token de autenticación.
      Cookie.set('token', response, { expires: 2, secure: true, sameSite: 'None', path: '/' })
      // Redirige al usuario a la página de inicio ('/home').
      navigate('/home')
    } catch (error) {
      console.log(error)
      const message = error?.response?.data?.message
      toast.error('Oppss!!', {
        description: message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="h-screen ">
        <section className="absolute top-11 left-11 " style={{ animation: 'show 0.8s ease-in-out' }}>
          <img src="image/logoSena.webp" alt="Sena" className="w-[4rem]" />
        </section>
        <Toaster position="top-right" closeButton richColors />
        <section className="grid h-screen place-items-center " style={{ animation: 'show 0.8s ease-in-out' }}>
          <form className="relative w-[400px] bg-white  p-[1rem] rounded-xl grid text-center shadow-lg place-items-center" onSubmit={sendData}>
            <h2 className="text-[1.5rem] font-bold mb-7">Iniciar Sesión</h2>
            <section className="grid w-[80%] gap-8  ">
              <section className="z-0 flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                <Input type="text" isRequired label="Número documento" labelPlacement={'outside'} autoComplete="off" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
              </section>
              <section className="z-0 flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                <Input
                  isRequired
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
              </section>
              <p className="text-sm cursor-pointer hover:text-[#587fff]">{/* <Link to="/password">¿Olvidaste tu contraseña?</Link> */}</p>
              <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3" disabled={isLoading}>
                {/* Deshabilitamos el botón mientras se realiza el inicio de sesión */}
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
              <p className="text-sm">
                ¿Nuevo usuario?{' '}
                <Link className="text-sm text-[#587fff]" to={'/Register'}>
                  Registrate
                </Link>
              </p>
            </section>
          </form>
        </section>
        <Footer />
      </main>
    </>
  )
}
