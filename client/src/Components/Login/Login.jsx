import './Login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { login } from '../../api/httpRequest'
import Cookie from 'js-cookie'
// import image from "../../assets/image/imageLogin.png";

export const Login = () => {
  const num_documento = useRef()
  const contrasena = useRef()

  const sendData = async (e) => {
    e.preventDefault()
    const dataValue = {
      num_documento: num_documento.current.value,
      contrasena: contrasena.current.value,
    }

    try {
      const res = await login(dataValue)
      const response = res.data.response.info.token

      Cookie.set('token', response, { expires: 2,secure : true, sameSite: 'None', path: '/' })
    } catch (error) {}
  }

  return (
    <main className="container">
      <section className="main">
        <form className="loginForm" onSubmit={sendData}>
          <h2 className="title">Iniciar Sesión</h2>
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
            <p className="text">
              <a href="" className="text">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
            <button className="btn">Iniciar sesión</button>
            <p className="textForm">
              ¿Nuevo usuario?{' '}
              <Link className="text" to={'/Register'}>
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
  )
}
