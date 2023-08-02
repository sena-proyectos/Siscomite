import './Register.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { register } from '../../api/httpRequest'
// import image from "../../assets/image/register.png";

export const Register = () => {
  const nombre = useRef()
  const apellido = useRef()
  const correo_institucional = useRef()
  const telefono = useRef()
  const tipo_documento = useRef()
  const num_documento = useRef()
  const contrasena = useRef()

  const sendData = async (e) => {
    e.preventDefault()
    const dataValue = {
      nombre: nombre.current.value,
      apellido: apellido.current.value,
      correo_institucional: correo_institucional.current.value,
      num_telefono: telefono.current.value,
      tipo_documento: tipo_documento.current.value,
      num_documento: num_documento.current.value,
      contrasena: contrasena.current.value,
    }

    try {
      const res = await register(dataValue)
      const response = res.data.message
    } catch (error) {}
  }

  return (
    <main className="container">
      <section className="main">
        <form className="registerForm" onSubmit={sendData}>
          <h2 className="title">Crear una cuenta</h2>
          <section className="formContainerR">
            <section className="inputGroup">
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={nombre} />
                <label className="formLabel" htmlFor="document">
                  Nombre
                </label>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={apellido} />
                <label className="formLabel" htmlFor="document">
                  Apellido
                </label>
              </section>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " autoComplete="off" ref={correo_institucional} />
              <label className="formLabel" htmlFor="document">
                Correo institucional
              </label>
            </section>

            <section className="inp">
              <input type="text" name="document" className="formInputRe" placeholder=" " autoComplete="off" ref={telefono} />
              <label className="formLabel" htmlFor="document">
                Teléfono
              </label>
            </section>

            <section className="inputGroupDocument">
              <section className="inpu">
                <select className="formSelect" ref={tipo_documento}>
                  <option value="">Tipo de documento</option>
                  <option value="C.C">C.C</option>
                  <option value="C.E">C.E</option>
                  <option value="T.I">T.I</option>
                  <option value="PE">PE</option>
                </select>
              </section>
              <section className="inpu">
                <input type="text" name="document" className="formInputR" placeholder=" " autoComplete="off" ref={num_documento} />
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
        </form>
      </section>
    </main>
  )
}
