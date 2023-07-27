import './Login.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react' // Agregamos useState para manejar el estado de carga
import { login } from '../../api/httpRequest'
import { Toast } from '../toast/toast'
import Cookie from 'js-cookie'

export const Login = () => {
  const num_documento = useRef()
  const contrasena = useRef()
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar el estado de carga
  const [error, setError] = useState(null) // Estado para manejar los errores

  const sendData = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const dataValue = {
      num_documento: num_documento.current.value,
      contrasena: contrasena.current.value,
    }

    try {
      const res = await login(dataValue)
      const response = res.data.response.info.token
      Cookie.set('token', response, { expires: 2, secure: true, sameSite: 'None', path: '/' })
      setError(null)
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

  return (
    <main className="container">
      <section className="main">
        <form className="loginForm" onSubmit={sendData}>
          <h2 className="title">Iniciar Sesión</h2>
          {error && <Toast message={error} typeToast={'error'} onClose={closed} />}
          <section className="formContainer">
            <section className="inp">
              <input type="text" name="document" className="formInput" placeholder=" " autoComplete="off" ref={num_documento} />
              <label className="formLabel" htmlFor="document">
                Número de documento
              </label>
            </section>
            <section className="inp">
              <input type="password" name="password" className="formInput" placeholder=" " autoComplete="off" ref={contrasena} />
              <label className="formLabel" htmlFor="password">
                Contraseña
              </label>
            </section>
            <p className="text">¿Olvidaste tu contraseña?</p>
            <button className="btn" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
            <p className="textForm">
              ¿Nuevo usuario?{' '}
              <Link className="text" to={'/Register'}>
                Registrate
              </Link>
            </p>
          </section>
        </form>
      </section>
    </main>
  )
}
