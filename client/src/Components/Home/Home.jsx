/* Importaciones de modulos y componentes */
import './Home.css'
import { Card } from '../Utils/Card/Card'
import { Button, Divider } from '@nextui-org/react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT

const getElementsByRole = () => {
  const token = Cookie.get('token') // Obtener el token almacenado en las cookies
  const information = jwt(token) // Decodificar el token JWT
  let rolToken = information.id_rol

  // Mapear los ID de rol a nombres de rol
  if (rolToken === 1) rolToken = 'Coordinador'
  if (rolToken === 2) rolToken = 'Instructor'
  if (rolToken === 3) rolToken = 'Administrador'

  return {
    adminCoordi: rolToken === 'Administrador' || rolToken === 'Coordinador',
    administration: rolToken === 'Administrador',
    coordination: rolToken === 'Coordinador',
    instructor: rolToken === 'Instructor'
  }
}

// Obtener los elementos que se deben mostrar según el rol
const elements = getElementsByRole()

const Home = () => {
  /* matriz para las cards de acceso rapido del home */
  const data = [
    {
      titleHome: 'Solicitudes',
      image: '/image/solicitudes.webp',
      descripciónHome: 'Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación.',
      Link: '/requests'
    },
    {
      titleHome: `${elements.administration ? 'Trámites solicitud' : elements.coordination ? 'Usuarios' : 'Crear solicitud'}`,
      image: '/image/solicitud.webp',
      descripciónHome: `${
        elements.administration ? 'Aquí podrás realizar trámites de las solicitudes como enviar archivos a los distintos correos con su respectiva plantilla.' : elements.coordination ? 'Aquí puedes visualizar todos los usuarios registrados en la plataforma, revisar su estado y gestionar sus permisos.' : 'Aquí podrás crear una solicitud para un comité de evaluación y seguimiento.'
      }`,
      Link: `${elements.administration ? '/procedures' : elements.coordination ? '/teachers' : '/create'}`
    },
    {
      titleHome: 'Fichas',
      image: '/image/fichas.webp',
      descripciónHome: 'Aquí podrás visualizar las fichas del CTM.',
      Link: '/groups'
    },
    {
      titleHome: 'Reglamento',
      image: '/image/reglamento.webp',
      descripciónHome: 'Aquí podrás ver el reglamento para consultar los artículos necesarios.',
      Link: '/rules'
    }
  ]

  return (
    <>
      <main className="flex w-full h-screen">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <section className="flex max-w-[100%]">
            <section className="w-full h-screen ">
              <header className="grid mt-8 grid-cols-2-column-table place-items-end">
                <h1 className=" text-[2rem] font-extrabold border-b-[1.5px] border-[#0799b6]   ">Siscomite</h1>
                <section className="flex items-center justify-center w-full h-full">
                  <NotifyBadge />
                </section>
              </header>

              <section className="h-[85vh] flex flex-col items-center mt-[1rem]">
                <section className="w-[95%] grid grid-cols-4 gap-x-10 place-items-center max-[900px]:grid-cols-2 max-[900px]:grid max-[500px]:grid-cols-1">
                  {data.map((x, i) => (
                    <Link to={x.Link} key={i}>
                      <section className="h-[28%] mt-6 max-[900px]:mt-[5rem] text-black cardHome" style={{ transition: '0.4s ease-in-out' }}>
                        <Card inside image={x.image} titleHome={x.titleHome} descripciónHome={x.descripciónHome} />
                      </section>
                    </Link>
                  ))}
                </section>
                <section className="w-full mt-[5rem] ">
                  <section className="flex flex-col items-center">
                    <p className="text-xl font-extrabold">Recomendaciones</p>
                    <section className=" max-w-[70%] max-[900px]:max-w-[85%] bg-white shadow-lg rounded-xl mt-2 p-[1rem]">
                      <section className="grid place-items-center">
                        <p className="text-xl font-bold text-red-500">
                          <i className="fi fi-rr-triangle-warning mr-[.5rem] text-red-500"></i>
                          Importante
                        </p>
                        <p className="text-sm">Los datos deben ser los registrados en Sofía Plus</p>
                      </section>

                      <Divider />

                      <p className="font-bold">Agregar aprendices</p>
                      <section className="flex mt-1">
                        <p className="text-sm">
                          Para poder agregar aprendices a una ficha es necesario descargar el excel y llenar los campos solicitados sin modificarlo, ya que este es el único formato que permite el programa.
                          <Button color="success" size="sm" variant="light" className="">
                            <a href="/Reporte de Aprendices.xlsx" download={'Reporte de Aprendices.xlsx'}>
                              Descargar excel <i className="fi fi-rr-download"></i>
                            </a>
                          </Button>
                        </p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
              <Footer />
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export { Home }
