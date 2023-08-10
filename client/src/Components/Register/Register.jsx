import './Register.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { register } from '../../api/httpRequest'
import { Toast } from '../toast/toast'
import { Footer } from '../Footer/Footer'
import Image from '../../assets/image/logoSena.png'

export const Register = () => {
  const nombres = useRef()
  const apellidos = useRef()
  const email_sena = useRef()
  const numero_celular = useRef()
  const id_documento = useRef()
  const numero_documento = useRef()
  const contrasena = useRef()

  const [error, setError] = useState()
  const [message, setMessage] = useState()

  const sendData = async (e) => {
    e.preventDefault()
    const dataValue = {
      nombres: nombres.current.value,
      apellidos: apellidos.current.value,
      email_sena: email_sena.current.value,
      numero_celular: numero_celular.current.value,
      id_documento: id_documento.current.value,
      numero_documento: numero_documento.current.value,
      contrasena: contrasena.current.value,
    }

    try {
      const res = await register(dataValue)
      const response = res.data.message
      setMessage(response)
    } catch (error) {
      const message = error.response.data.message
      setError(message)
    }
  }

  const closed = () => {
    setError(null)
    setMessage(null)
  }

  return (
    <main className="container">
      <section className="logo">
        <img src={Image} alt="Sena" />
        {/* <span className="sena">SENA</span> */}
      </section>
      <section className="main">
        <form className="registerForm" onSubmit={sendData}>
          <h2 className="title">Crear una cuenta</h2>
          {error && <Toast message={error} typeToast="warnning" onClose={closed} />}
          {message && <Toast message={message} typeToast="success" onClose={closed} />}
          <section className="formContainerR">
            <section className="inputGroup">
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={nombres} />
                <label className="formLabel" htmlFor="document">
                  Nombre
                </label>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={apellidos} />
                <label className="formLabel" htmlFor="document">
                  Apellido
                </label>
              </section>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " autoComplete="off" ref={email_sena} />
              <label className="formLabel" htmlFor="document">
                Correo institucional
              </label>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " autoComplete="off" ref={numero_celular} />
              <label className="formLabel" htmlFor="document">
                Teléfono
              </label>
            </section>

            <section className="inputGroupDocument">
              <section className="inpu">
                <select className="formSelect" ref={id_documento}>
                  <option value="">Tipo de documento</option>
                  <option value="1">C.C</option>
                  <option value="2">C.E</option>
                  <option value="3">T.I</option>
                  <option value="4">PEP</option>
                </select>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={numero_documento} />
                <label className="formLabel" htmlFor="document">
                  Documento
                </label>
              </section>
            </section>

            <section className="inp">
              <input type="password" name="password" className="formInputRe" placeholder=" " ref={contrasena} />
              <label className="formLabel" htmlFor="password">
                Contraseña
              </label>
            </section>

            <button className="btn">Registrate</button>
            <p className="textForm">
              ¿Ya estas registrado?{' '}
              <Link className="text" to={'/'}>
                Iniciar sesión
              </Link>
            </p>
          </section>
          <Footer />
        </form>
      </section>
    </main>
  )
}
