import './Students.css'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Search } from '../Search/Search'
import { Card } from '../Utils/Card/Card'
import { Footer } from '../Footer/Footer'
import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import { Modal } from '../Utils/Modal/Modal'

const Students = () => {
  const cards = [
    { title: 'Angie Tatiana Mosquera Arco', document: 'CC', descripción: 1027150354 },
    { title: 'Mariano Lore Florez Azul', document: 'TI', descripción: 24567877 },
    { title: 'Guillermo Stiven Bejumeda Morales', document: 'CE', descripción: 34567876 },
    { title: 'Lorena Quiceno Giraldo', document: 'CC', descripción: 49878787 },
    { title: 'Juan Guillermo Gomez Zapata', document: 'CC', descripción: 57656787 },
    { title: 'Mariano Lopez Robledo Estrada', document: 'TI', descripción: 655676 },
    { title: 'Mariana Lucia Perez Carol', document: 'CC', descripción: 79876787 },
    { title: 'Estaban Quito Romero Suarez', document: 'CC', descripción: 8766567 },
    { title: 'Luna Lunera Roble Maria', document: 'CE', descripción: 98765786 },
    { title: 'Carla María Tibetano De Espana', document: 'PE', descripción: 1076567766 },
  ]

  const itemsPerPage = 8 // Número de elementos por página
  const [activePage, setActivePage] = useState(1)

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem)

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const [modalStudent, setModalStudent] = useState(false)
  const modalAdd = () => {
    setModalStudent(!modalStudent)
  }

  const [infoStudents, setInfoStudents] = useState(false)
  const infoStudent = () => {
    setInfoStudents(!infoStudents)
  }

  return (
    <>
      {modalStudent && <Modal modalAdd cerrarModal={modalAdd} titulo={<section className="text-2xl font-semibold">Agregar Estudiantes</section>} />}
      {infoStudents && <Modal modalInfo cerrarModal={infoStudent} titulo={<section className="text-2xl font-semibold">Información</section>} />}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-full h-screen">
          <header className="grid p-6 place-items-center">
            <Search className="student_Bar" icon={<i class="fi fi-rr-settings-sliders relative left-[-3rem] " />} placeholder={'Busca un aprendiz'} />
          </header>
          <section className="flex flex-wrap items-center justify-center p-2">
            {currentItems.map((item) => {
              return (
                <section className="w-[170px] rounded-md overflow-hidden ml-12 mb-12 p-4 bg-[#e0e0e0] cursor-pointer" style={{ boxShadow: '5px 5px 10px #969696, -5px -5px 10px #ffffff' }} key={item.title}>
                  <Card header click={infoStudent} title={item.title} document={item.document} descripción={item.descripción} />
                </section>
              )
            })}
          </section>
          <section className="aStudents">
            <Pagination activePage={activePage} itemsCountPerPage={itemsPerPage} totalItemsCount={cards.length} pageRangeDisplayed={5} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8">
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-md text-2xl bg-[#2e323e] relative cursor-pointer outline-none border-none add" onClick={modalAdd}>
              +
            </button>
          </section>
          <section className="relative">
            <Footer />
          </section>
        </section>
      </main>
    </>
  )
}

export { Students }
