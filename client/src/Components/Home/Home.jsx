/* Importaciones de modulos y componentes */
import './Home.css'
import { useState } from 'react'
import { Card } from '../Utils/Card/Card'
import { Button, Divider, Badge } from '@nextui-org/react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { Notify } from '../Utils/NotifyBar/NotifyBar'

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
      titleHome: 'Crear solicitud',
      image: '/image/solicitud.webp',
      descripciónHome: 'Aquí podrás crear una solicitud para un comité de evalución.',
      Link: '/create'
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

  /* Estado para las notificaciones */
  const [notifyOpen, setNotifyOpen] = useState(false)

  /* Cambiar estado de las notificaciones */
  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }

  return (
    <>
      <main className="flex h-screen w-full">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <section className="flex max-w-[100%]">
            <section className="w-full h-screen ">
              <header className="mt-8 flex justify-center text-[23px]">
                <h1 className=" text-[2rem] place-items-center font-extrabold border-b-[1.5px] border-[#0799b6]">Siscomite</h1>
                <section className="absolute right-[15%] cursor-pointer ">
                  {notifyOpen ? (
                    <></>
                  ) : (
                    <>
                      <Badge onClick={toggleNotify} content="99" shape="circle" color="danger" size="sm">
                        <Button className="muve" radius="full" variant="flat" color="primary" onClick={toggleNotify}>
                          Mensajes
                          <i className="fi fi-ss-bell text-blue-400 p-[.3rem]" />
                        </Button>
                      </Badge>
                    </>
                  )}
                </section>
              </header>

              <section className="h-[85vh] flex flex-col items-center mt-[1rem]">
                <section className="w-[95%] grid grid-cols-4 gap-x-10 place-items-center">
                  {data.map((x, i) => (
                    <Link to={x.Link} key={i}>
                      <section className="h-[28%] mt-6 text-black cardHome" style={{ transition: '0.4s ease-in-out' }}>
                        <Card inside image={x.image} titleHome={x.titleHome} descripciónHome={x.descripciónHome} />
                      </section>
                    </Link>
                  ))}
                </section>
                <section className="w-full mt-[5rem]">
                  <section className="flex flex-col items-center">
                    <p className="font-extrabold text-xl">Recomendaciones</p>
                    <section className=" max-w-[70%] bg-white shadow-lg rounded-xl mt-2 p-[1rem]">
                      <section className="grid place-items-center">
                        <p className="font-bold text-red-500 text-xl">
                          <i className="fi fi-rr-triangle-warning mr-[.5rem] text-red-500"></i>
                          Importante
                        </p>
                        <p className="text-sm">Los datos deben ser los registrados en Sofía Plus</p>
                      </section>

                      <Divider />

                      <p className="font-bold">Agregar aprendices</p>
                      <section className="flex mt-1">
                        <p className="text-sm">
                          Para poder agregar aprendices a una ficha en necesario descargar el excel y llenar los campos solicitados sin modificarlo, ya que este es el único formato que permite el progama.
                          <Button color="success" size="sm" variant="light" className="">
                            Descargar excel <i className="fi fi-rr-download"></i>
                          </Button>
                        </p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
              <Footer />
            </section>
            <section className="fixed  w-[20rem] right-0">
              <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export { Home }
