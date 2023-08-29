import './Students.css'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Search } from '../Search/Search'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { Footer } from '../Footer/Footer'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@nextui-org/react'
import { Modal } from '../Utils/Modal/Modal'
import { Button } from '@nextui-org/react'

import { useParams, useNavigate } from 'react-router-dom'
import { getApprenticesById, getApprenticesByIdFicha, getFichasById, searchApprenticesByIdFicha } from '../../api/httpRequest'

const Students = () => {
  const { id_ficha } = useParams()
  const [apprentices, setApprentices] = useState([])
  const [informationGruops, setInformationGruops] = useState([])
  const [message, setMessage] = useState()
  const [idStudent, setIdStudent] = useState()
  const [apprenticesSearch, setApprenticesSearch] = useState([])
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getApprentices = async () => {
      try {
        const response = await getApprenticesByIdFicha(id_ficha)
        const res = response.data.result
        setApprentices(res)
      } catch (error) {
        setMessage(error.response.data.message)
      }
    }

    // if(apprentices != undefined){
    //   console.log("hola")
    // }
    getApprentices()
  }, [apprentices])

  useEffect(() => {
    const getFichasByIdFicha = async () => {
      try {
        const response = await getFichasById(id_ficha)
        const res = response.data.result[0]
        setInformationGruops(res)
      } catch (error) {
        console.log(error)
      }
    }
    getFichasByIdFicha()
  }, [])

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

  const apprenticeId = (id) => {
    setInfoStudents(!infoStudents)
    setIdStudent(id)
  }

  const searchApprentices = async (nombres) => {
    const idFicha = id_ficha
    try {
      if (nombres.trim() === '') {
        setApprenticesSearch([])
        setError(null)
        return
      } else {
        const response = await searchApprenticesByIdFicha(idFicha, nombres)
        setApprenticesSearch(response.data.result)
        setError(null)
      }
    } catch (error) {
      const message = error.response.data.message
      setError(message)
      setApprenticesSearch([])
    }
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
          infoStudents={idStudent}
        />
      )}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-full h-screen overflow-auto">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={'Buscar aprendiz'} searchStudent={searchApprentices} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>

          <section className=" flex justify-between  px-[4rem] ">
            <Button color="primary" variant="flat" className="" onClick={() => navigate('/groups')}>
              <i className="fi fi-rr-arrow-left mt-[.5rem]"></i>Volver
            </Button>

            <section>
              <p className="font-semibold text-lg ">{informationGruops.nombre_programa}</p>
              <p className="flex justify-end">{informationGruops.numero_ficha}</p>
            </section>
          </section>
          <section className="h-[65vh] max-sm:h-[150%] max-[935px]:h-[85%] ">
            <section className="grid grid-cols-3 gap-5 items-center justify-center px-9 max-sm:grid-cols-1 max-[935px]:grid-cols-2 ">
              {error ? (
                <h1>{error}</h1>
              ) : (
                <>
                  {message && <h1>{message}</h1>}
                  {apprenticesSearch.length > 0 ? (
                    <>
                      {apprenticesSearch.map((item) => (
                        <Card className="w-full  z-0 shadow-lg" onClick={() => apprenticeId(item.id_aprendiz)} key={item.id_aprendiz}>
                          <CardHeader onClick={() => apprenticeId(item.id_aprendiz)} className="justify-between pb-0 cursor-pointer">
                            <div className="flex gap-5">
                              <i className="fi fi-rr-circle-user text-purple-500 text-[2rem]"></i>
                              <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</h4>
                                <h5 className="text-small tracking-tight text-default-400 flex">
                                  <p className="px-[4px]">{item.numero_documento_aprendiz}</p>
                                  {/* <p className="px-[4px]">{item.descripción}</p> */}
                                </h5>
                              </div>
                            </div>
                          </CardHeader>
                          <CardBody onClick={() => apprenticeId(item.id_aprendiz)} className="relarive  text-default-400 text-small cursor-pointer">
                            <p className="relative bottom-1">{item.email_aprendiz_sena}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      {currentItems.map((item) => (
                        <Card className="w-full z-0 shadow-lg" onClick={() => apprenticeId(item.id_aprendiz)} key={item.id_aprendiz}>
                          <CardHeader onClick={() => apprenticeId(item.id_aprendiz)} className="justify-between pb-0 cursor-pointer">
                            <div className="flex gap-5">
                              <i className="fi fi-rr-circle-user text-purple-500 text-[2rem]"></i>
                              <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</h4>
                                <h5 className="text-small tracking-tight text-default-400 flex">
                                  <p className="px-[4px]">{item.numero_documento_aprendiz}</p>
                                  {/* <p className="px-[4px]">{item.descripción}</p> */}
                                </h5>
                              </div>
                            </div>
                          </CardHeader>
                          <CardBody onClick={() => apprenticeId(item.id_aprendiz)} className="relarive  text-default-400 text-small cursor-pointer">
                            <p className="relative bottom-1">{item.email_aprendiz_sena}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </>
                  )}
                </>
              )}
            </section>
          </section>

          <section className="grid place-items-center ">
            <Pagination className="relative top-[.5rem] max-[935px]:pb-[3rem] z-0" total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={apprentices && apprentices.length} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8">
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-2xl text-3xl bg-[#2e323e] relative cursor-pointer outline-none border-none add" onClick={modalAdd}>
              +
            </button>
          </section>
          <section className="relative h-0">
            <Footer />
          </section>
        </section>
      </main>
    </>
  )
}

export { Students }
