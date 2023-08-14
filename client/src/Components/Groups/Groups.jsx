import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Pagination } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Modal } from '../Utils/Modal/Modal'
import { Card } from '../Utils/Card/Card'
import './Groups.css'

const Groups = () => {
  const cardData = [
    {
      id: 2345543,
      frontContent: 'Análisis y Desarrollo de Software',
      backContent: ['Maria Juana Perez', 'Presencial', 'Tarde'],
    },
    {
      id: 24567778,
      frontContent: 'Multimedia',
      backContent: ['Lorena Sofía Ramirez ', 'Virtual', 'Mañana'],
    },
    {
      id: 2656666,
      frontContent: 'Moda',
      backContent: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      id: 2344666,
      frontContent: 'Diseño de interiores',
      backContent: ['Item 1', 'Item 2', 'Item 3'],
    },
  ]

  const itemsPerPage = 3
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const startIdx = (activePage - 1) * itemsPerPage
  const visibleCards = cardData.slice(startIdx, startIdx + itemsPerPage)

  const [modalGroups, setModalGroups] = useState(false)
  const modalAddGroups = () => {
    setModalGroups(!modalGroups)
  }

  return (
    <>
      {modalGroups && <Modal modalAddGroups cerrarModal={modalAddGroups} titulo={<section className="text-2xl font-semibold">Agregar Fichas</section>} />}

      <main className="flex">
        <Sliderbar />
        <section className="w-screen">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={'Buscar ficha'} icon={<i class="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>
          <section className="flex flex-wrap justify-center gap-8 ">
            {visibleCards.map((card) => (
              <Link to={'/students'} key={card.id}>
                <Card
                  flip
                  frontContent={
                    <section className="p-[1rem] w-full ">
                      <p className="text-[16px] bg-blue-200 grid  rounded-xl w-full place-items-center">{card.id}</p>
                      <p className="">{card.frontContent}</p>
                    </section>
                  }
                  backContent={card.backContent.map((item, index) => (
                    <li className="relative top-3 left-4" key={index}>
                      {item}
                    </li>
                  ))}
                />
              </Link>
            ))}
          </section>
          <section className="grid place-items-center">
            <Pagination className="relative top-[.5rem] z-0" total={10} initialPage={1} color={'primary'} totalItemsCount={cardData.length} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8" onClick={modalAddGroups}>
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-md text-2xl bg-[#2e323e] relative">+</button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Groups }
