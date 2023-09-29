import './Students.css'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Search } from '../Search/Search'
import { Card, CardHeader, CardBody, Button, Pagination } from '@nextui-org/react'
import { Footer } from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { ModalAddStudents } from '../Utils/Modals/ModaAddStudents'
import { ModalInfoStudents } from '../Utils/Modals/ModalInfoStudents'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import { useParams, useNavigate } from 'react-router-dom'
import { changeStateGroups, getApprenticesByIdFicha, getFichasById, searchApprenticesByIdFicha } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'
import sw from 'sweetalert2'

const Students = () => {
  // Obtener el parámetro id_ficha desde la URL
  const { id_ficha } = useParams()

  // Estados para gestionar los datos de los aprendices y grupos
  const [apprentices, setApprentices] = useState([])
  const [informationGruops, setInformationGruops] = useState([])
  const [message, setMessage] = useState()
  const [idStudent, setIdStudent] = useState()
  const [apprenticesSearch, setApprenticesSearch] = useState([])
  const [error, setError] = useState(null)
  const [reloadFetch, setReloadFetch] = useState(false)

  // Número de elementos por página
  const itemsPerPage = 9
  const [activePage, setActivePage] = useState(1)

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = apprentices && apprentices.length > 0 ? apprentices.slice(indexOfFirstItem, indexOfLastItem) : []
  const totalPages = Math.ceil(apprentices && apprentices.length / itemsPerPage)

  const navigate = useNavigate()

  // Función para obtener los aprendices por ID de ficha
  const getApprentices = async () => {
    try {
      const response = await getApprenticesByIdFicha(id_ficha)
      const res = response.data.result
      setApprentices(res)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }
  useEffect(() => {
    getApprentices()
    if (reloadFetch === true) {
      setMessage(null)
      setReloadFetch(false)
    }
  }, [apprentices, reloadFetch])

  useEffect(() => {
    // Obtener información de las fichas por ID de ficha
    const getFichasByIdFicha = async () => {
      try {
        const response = await getFichasById(id_ficha)
        const res = response.data.result[0]
        setInformationGruops(res)
      } catch (error) {}
    }
    getFichasByIdFicha()
  }, [])

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  // Función para buscar aprendices
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

  //Abrir Modal para agregar estudiantes
  const [modalAddStudent, setModalStudentAdd] = useState(false)
  const modalStudents = () => {
    setModalStudentAdd(!modalAddStudent)
  }
  //Abrir Modal para la informacíon de estudiantes
  const [modalInfoStudents, setInfoStudents] = useState(false)
  const infoStudents = (id) => {
    setInfoStudents(!modalInfoStudents)
    setIdStudent(id)
  }

  const StateGroups = () => {
    try {
      sw.fire({
        title: '¿Estás seguro que quieres desactivar esta ficha?',
        text: 'Estos cambios serán irreversibles',
        showDenyButton: true,
        confirmButtonText: 'Desactivar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await changeStateGroups(id_ficha)
          const message = response.data.message
          toast.success('Genial!!', {
            description: message
          })
          navigate('/groups')
        }
      })
    } catch (error) {
      const message = error.response.data.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  return (
    <>
      {modalAddStudent && <ModalAddStudents cerrarModal={modalStudents} reloadFetchState={setReloadFetch} />}

      {modalInfoStudents && <ModalInfoStudents cerrarModal={infoStudents} idStudents={idStudent} />}

      <main className="flex h-screen">
        <Sliderbar />
        <Toaster position="top-right" closeButton richColors />
        <section className="w-full h-screen overflow-auto">
          <header className="p-[1.5rem] flex items-center justify-center">
            <section className="w-[40%] max-md:max-w-[10rem]">
              <Search placeholder={'Buscar aprendiz'} searchStudent={searchApprentices} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
            <Button color="danger" variant="bordered" onClick={StateGroups}>
              Deshabilitar ficha
            </Button>
          </header>

          <section className=" flex justify-between px-[4rem] ">
            <Button color="primary" variant="flat" className="" onClick={() => navigate('/groups')}>
              <i className="fi fi-rr-arrow-left mt-[.5rem]"></i>Volver
            </Button>

            <section>
              <p className="font-semibold text-lg ">{informationGruops.nombre_programa}</p>
              <p className="flex justify-end">{informationGruops.numero_ficha}</p>
            </section>
          </section>
          <section className="h-[65vh] max-sm:h-[190%] max-[935px]:h-[115%]">
            <section className="grid grid-cols-3 gap-5 items-center justify-center px-9 max-sm:grid-cols-1 max-[935px]:grid-cols-2 ">
              {error ? (
                <h1>{error}</h1>
              ) : (
                <>
                  {message && <h1>{message}</h1>}
                  {apprenticesSearch.length > 0 ? (
                    <>
                      {apprenticesSearch.map((item) => (
                        <Card className="w-full  z-0 shadow-lg" onClick={() => infoStudents(item.id_aprendiz)} key={item.id_aprendiz}>
                          <CardHeader onClick={() => infoStudents(item.id_aprendiz)} className="justify-between pb-0 cursor-pointer">
                            <div className="flex gap-5">
                              <i className="fi fi-rr-circle-user text-green-500 text-[2rem]"></i>
                              <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</h4>
                                <h5 className="text-small tracking-tight text-default-400 flex">
                                  <p className="px-[4px]">{item.numero_documento_aprendiz}</p>
                                </h5>
                              </div>
                            </div>
                          </CardHeader>
                          <CardBody onClick={() => infoStudents(item.id_aprendiz)} className="relarive  text-default-400 text-small cursor-pointer">
                            <p className="relative bottom-1">{item.email_aprendiz_sena}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      {currentItems &&
                        currentItems.map((item) => (
                          <Card className="w-full max-h-[8rem] z-0 shadow-lg" onClick={() => infoStudents(item.id_aprendiz)} key={item.id_aprendiz}>
                            <CardHeader onClick={() => infoStudents(item.id_aprendiz)} className="justify-between pb-0 cursor-pointer">
                              <div className="flex gap-5">
                                <i className="fi fi-rr-circle-user text-green-500 text-[2rem]"></i>
                                <div className="flex flex-col gap-1 items-start justify-center">
                                  <h4 className="text-small font-semibold leading-none text-default-600">{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</h4>
                                  <h5 className="text-small tracking-tight text-default-400 flex">
                                    <p className="px-[4px]">{item.numero_documento_aprendiz}</p>
                                  </h5>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody onClick={() => infoStudents(item.id_aprendiz)} className="relative text-default-400 text-small cursor-pointer">
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
            <Pagination className={`relative top-[.5rem] max-[935px]:pb-[7.5rem] max-[935px]:mt-[8px]  z-0 ${apprenticesSearch.length > 0 ? 'hidden' : ''}`} total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={apprentices && apprentices.length} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-[2.5%]">
            <button className="w-[13rem] h-[60px] rounded-3xl text-white shadow-2xl  bg-[#2e323e] relative cursor-pointer outline-none border-none active:bg-[#87a0ec] active:transform active:scale-90 transition duration-150 ease-in-out" onClick={modalStudents}>
              <p className="text-[15px] top-0 block">
                <i className="fi fi-br-plus block" />
                Agregar aprendices
              </p>
            </button>
          </section>
          <section className="fixed right-[10%] top-[2rem]">
            <section className=" cursor-pointer ">
              <NotifyBadge />
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Students }
