/* Importaciones de modulos y componentes */
import './Home.css'
import { Card } from '../Utils/Card/Card'
import { Button, Divider, Badge } from '@nextui-org/react'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

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
  return (
    <>
      <main className="flex h-screen w-full">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <section className="flex max-w-[100%]">
            <section className="w-full h-screen ">
              <header className="mt-8 flex justify-center text-[23px]">
                <h1 className=" text-[2rem] place-items-center font-extrabold border-b-[1.5px] border-[#0799b6]">Siscomite</h1>
              </header>

              <section className="h-[85vh] flex justify-center items-start">
                <section className="w-[95%] grid grid-cols-4 gap-x-10 place-items-center">
                  {data.map((x, i) => (
                    <Link to={x.Link} key={i}>
                      <section className="h-[28%] mt-6 text-black cardHome " style={{ transition: '0.4s ease-in-out' }}>
                        <Card inside image={x.image} titleHome={x.titleHome} descripciónHome={x.descripciónHome} />
                      </section>
                    </Link>
                  ))}
                  <section className="col-span-3 mt-[4rem]   ">
                    <p className="font-extrabold text-lg">Recomendaciones</p>
                    <section className="bg-white shadow-lg rounded-xl mt-2 p-[1rem] ">
                      <p className="font-semibold ">Agregar aprendices</p>
                      <section className="flex mt-1">
                        <p className="text-sm">
                          Para poder agregar aprendices a una ficha en necesario descargar el excel y llenar los campos solicitados sin modificarlo, ya que este es el único formato que permite el progama.
                          <Button color="success" size="sm" variant="light" className="">
                            <a href="../../../public/Reporte de Aprendices.xlsx" download={'Reporte de Aprendices.xlsx'}>
                              Descargar excel <i className="fi fi-rr-download"></i>
                            </a>
                          </Button>
                        </p>
                      </section>
                      <Divider />
                      <section className="grid place-items-center ">
                        <p className="font-semibold text-red-500 pt-[.8rem]">
                          <i className="fi fi-rr-triangle-warning mr-[.5rem] text-red-500"></i>
                          Importante
                        </p>
                        <p className="text-sm">Los datos deben ser los registrados en Sofía Plus</p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
              <Footer />
            </section>
            <section className="fixed right-[15%] top-[2.5rem]">
              <section className=" cursor-pointer ">
                <NotifyBadge />
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export { Home }
