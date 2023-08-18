import './Students.css'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Search } from '../Search/Search'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from '@nextui-org/react'
import { Footer } from '../Footer/Footer'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@nextui-org/react'
import { Modal } from '../Utils/Modal/Modal'

import { useParams } from 'react-router-dom'
import { getApprenticesByIdFicha } from '../../api/httpRequest'

const Students = () => {
  const { id_ficha } = useParams()
  const [apprentices, setApprentices] = useState([])
  const [message, setMessage] = useState()

  useEffect(() => {
    const getApprentices = async () => {
      try {
        const response = await getApprenticesByIdFicha(id_ficha)
        const res = response.data.result
        setApprentices(res)
        setMessage(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }
    getApprentices()
  }, [apprentices])

  const [isFollowed, setIsFollowed] = React.useState(false)

  const itemsPerPage = 9 // Número de elementos por página
  const [activePage, setActivePage] = useState(1)

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = apprentices && apprentices.length > 0 ? apprentices.slice(indexOfFirstItem, indexOfLastItem) : []
  const totalPages = Math.ceil(apprentices && apprentices.length / itemsPerPage)

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
      {modalStudent && (
        <Modal
          modalAdd
          cerrarModal={modalAdd}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rr-user-add text-green-500 px-3"></i>Agregar Estudiantes
            </section>
          }
        />
      )}
      {infoStudents && (
        <Modal
          modalInfo
          cerrarModal={infoStudent}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rs-file-user text-blue-600 px-3"></i>Información
            </section>
          }
        />
      )}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-full h-screen overflow-auto ">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={'Buscar soicitud'} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>
          <section className=" relative grid justify-end px-[4.5rem] py-0">
            <p className="font-semibold text-lg">Análisis y desarrollo de software</p>
            <p className="grid justify-end ">2473196</p>
          </section>
          <section className="flex flex-wrap gap-5 items-center justify-center p-2 studentsstyle">
            {message ? (
              <h1>{message}</h1>
            ) : (
              <>
                {currentItems.map((item) => (
                  <Card className="w-[340px] z-0 shadow-lg" onClick={infoStudent} key={item.id_aprendiz}>
                    <CardHeader onClick={infoStudent} className="justify-between pb-0 cursor-pointer">
                      <div className="flex gap-5">
                        <i className="fi fi-rr-circle-user text-purple-500 text-[2rem]"></i>
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">{item.nombres_aprendiz}</h4>
                          <h5 className="text-small tracking-tight text-default-400 flex">
                            <p className="px-[4px]">{item.numero_documento_aprendiz}</p>
                            {/* <p className="px-[4px]">{item.descripción}</p> */}
                          </h5>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody onClick={infoStudent} className="relarive  text-default-400 text-small cursor-pointer">
                      <p className="relative bottom-1">{item.email_aprendiz_sena}</p>
                    </CardBody>
                  </Card>
                ))}
              </>
            )}
          </section>

          <section className="grid place-items-center">
            <Pagination className="relative top-[.5rem] z-0" total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={apprentices && apprentices.length} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8">
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-2xl text-3xl bg-[#2e323e] relative cursor-pointer outline-none border-none add" onClick={modalAdd}>
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
