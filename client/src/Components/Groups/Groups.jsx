import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Modal } from '../Utils/Modal/Modal'
import { Card } from '../Utils/Card/Card'
import './Groups.css'
import { getFichas } from '../../api/httpRequest'

const Groups = () => {
  const [fichas, setFichas] = useState([])

  useEffect(() => {
    const getFicha = async () => {
      try {
        const response = await getFichas()
        const res = response.data.result
        setFichas(res)
      } catch (error) {
        console.log(error)
      }
    }

    getFicha()
  }, [fichas])

  const itemsPerPage = 9
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const startIdx = (activePage - 1) * itemsPerPage
  const visibleCards = fichas.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(fichas.length / itemsPerPage)

  const [modalGroups, setModalGroups] = useState(false)
  const modalAddGroups = () => {
    setModalGroups(!modalGroups)
  }

  return (
    <>
      {modalGroups && (
        <Modal
          modalAddGroups
          cerrarModal={modalAddGroups}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rr-users-medical text-green-500 px-3"></i>Agregar Fichas
            </section>
          }
        />
      )}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-screen overflow-auto">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={'Buscar ficha'} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>
          <section className="flex flex-wrap align-center justify-center gap-8 h-[69vh]">
            {visibleCards.map((card) => (
              <Link to={`/students/${card.id_ficha}`} key={card.id_ficha}>
                <Card
                  flip
                  frontContent={
                    <section className="p-[1rem] w-full ">
                      <p className="text-[16px] bg-blue-200 grid  rounded-xl w-full place-items-center">{card.numero_ficha}</p>
                      <p className="">{card.nombre_programa}</p>
                    </section>
                  }
                  backContent={
                    <ul className="list">
                      <li className="relative top-3 left-4 listItem">{card.jornada}</li>
                      <li className="relative top-3 left-4 listItem">{card.etapa_programa}</li>
                    </ul>
                  }
                />
              </Link>
            ))}
          </section>
          <section className="grid place-items-center">
            <Pagination className="relative top-[.5rem] z-0" total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={totalPages} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8" onClick={modalAddGroups}>
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-md text-3xl bg-[#2e323e] relative">+</button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Groups }

const SkeletonLoading = () => {
  return (
    <div>
      <Skeleton width={'100%'} height={'100%'} />
    </div>
  )
}
