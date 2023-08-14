import './Home.css'
import { Card } from '../Utils/Card/Card'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { Skeleton } from '@nextui-org/react'
import image from '../../assets/image/solicitudes.jpg'
import image2 from '../../assets/image/solicitud.jpg'
import image3 from '../../assets/image/fichas.jpg'
import image4 from '../../assets/image/reglamento.jpg'
import image5 from '../../assets/image/aprendiz.jpg'

const Home = () => {
  return (
    <main className="flex h-screen">
      <Sliderbar />
      <section className="justify-center h-screen">
        <header className="p-8 grid place-items-center text-[23px]">
          <h1 className="w-80 grid place-items-center border-b-[1.5px] border-[#0799b6]">Siscomite</h1>
        </header>
        <section className="h-[80vh] flex-wrap flex items-center justify-center gap-x-20">
          <Link to={'/requests'}>
            <section className="h-[28%] text-black" style={{ transition: '0.4s ease-in-out' }}>
              <Card inside image={image} titleHome={'Solicitudes'} descripciónHome={'Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación.'} />
            </section>
          </Link>
          <Link to={'/create'}>
            <section className="h-[28%] text-black" style={{ transition: '0.4s ease-in-out' }}>
              <Card inside image={image2} titleHome={'Crear Solicitud'} descripciónHome={'Aquí podrás crear una solicitud para un comité de evalución.'} />
            </section>
          </Link>
          <Link to={'/groups'}>
            <section className="h-[28%] text-black" style={{ transition: '0.4s ease-in-out' }}>
              <Card inside image={image3} titleHome={'Fichas'} descripciónHome={'Aquí podrás visualizar las fichas del CTM.'} />
            </section>
          </Link>

          <Link>
            <section className="h-[28%] text-black" style={{ transition: '0.4s ease-in-out' }}>
              <Card inside image={image4} titleHome={'Reglamento'} descripciónHome={'Aquí podrás ver el reglamento para consultar los artículos necesarios.'} />
            </section>
          </Link>
          <Link to={'/students'}>
            <section className="h-[28%] text-black" style={{ transition: '0.4s ease-in-out' }}>
              <Card inside image={image5} titleHome={'Agregar Aprendiz'} descripciónHome={'Aquí podrás Agregar aprendices.'} />
            </section>
          </Link>
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Home }
