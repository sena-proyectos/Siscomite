/* Importaciones de modulos y componentes */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Pagination, Tooltip, Button, Badge, Chip } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { ModalAddGroups } from '../Utils/Modals/ModalAddGroup'
import { changeStateGroups, getFichas } from '../../api/httpRequest'
import { fichaInformationStore } from '../../store/config'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'
import './Groups.css'

import { Toaster, toast } from 'sonner'
import sw from 'sweetalert2'

/* Definicion del componente */
const Groups = () => {
  /* Estado y variables de estado del componente */
  const [isOpen] = useState(false)
  const [fichas, setFichas] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [actualView, setActualView] = useState(null)
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [reloadFetch, setReloadFetch] = useState(false)

  // Hacer uso de la funcion obtener fichas
  useEffect(() => {
    getFicha()
    if (reloadFetch === true) {
      setReloadFetch(false)
    }
  }, [fichas, reloadFetch])

  /* Funcion para obtener las fichas guardadas en la base de datos */
  const getFicha = async () => {
    try {
      const response = await getFichas()
      const res = response.data.result
      setFichas(res)
    } catch (error) {
      console.error(error)
    }
  }

  // Funciones para la paginación y selección de elementos mostar por página
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const [itemsPerPage, setItemsPerPage] = useState(6) // Establece un valor predeterminado de fichas a mostrar

  /* establecer paginado y numero de paginacion */
  const startIdx = (activePage - 1) * itemsPerPage
  const visibleCards = fichas.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(fichas.length / itemsPerPage)

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value)
    setItemsPerPage(newItemsPerPage)
    setActivePage(1)
  }

  // Hover cards
  const [hoveredCards, setHoveredCards] = useState({})

  // Función para activar el hover en una card
  const handleCardHover = (id) => {
    setHoveredCards((prevHovered) => ({
      ...prevHovered,
      [id]: true
    }))
  }

  // Función para desactivar el hover en una card
  const handleCardLeave = (id) => {
    setHoveredCards((prevHovered) => ({
      ...prevHovered,
      [id]: false
    }))
  }

  // Modal detalles
  const [modalGroups, setModalGroups] = useState(false)
  const modalAddGroups = () => {
    setModalGroups(!modalGroups)
  }

  // .................Tabla............
  // Estado para controlar la visibilidad de la tabla y las cards
  const [isCardVisible, setIsCardVisible] = useState(true)

  // Almacenar la preferencia del usuario en localStorage
  useEffect(() => {
    checkTableView()
  }, [])

  /* Obtener el el estado guardado en el localStorage */
  const checkTableView = () => {
    const item = localStorage.getItem('view')
    if (item) {
      setActualView(item)
      return
    }
  }

  /* Enviar estado de la tabla al localStorage */
  const tableView = (value) => {
    localStorage.setItem('view', value)
    setActualView(value)
  }

  // Cambiar la vista entre cards y tabla
  const toggleView = () => {
    setIsGridView((prevView) => !prevView)
  }

  // Cambiar la visibilidad de la tarjeta
  const toggleContent = () => {
    setIsCardVisible((prevVisibility) => !prevVisibility)
  }

  // funcion para deshabilitar ficha
  const StateGroups = (id) => {
    try {
      sw.fire({
        title: '¿Estás seguro que quieres desactivar esta ficha?',
        text: 'Estos cambios serán irreversibles',
        showDenyButton: true,
        confirmButtonText: 'Desactivar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await changeStateGroups(id)
          const message = response.data.message
          toast.success('Genial!!', {
            description: message
          })
        }
      })
    } catch (error) {
      const message = error.response.data.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  // ---------------- Filtros --------------------
  const [searchValue, setSearchValue] = useState('') // Estado para el valor de búsqueda
  const [searchResults, setSearchResults] = useState([]) // Estado para los resultados de la búsqueda
  const [selectedEstado, setSelectedEstado] = useState('') // Estado inicial vacío para el filtro de estado la solicitud
  const [selectedJornada, setSelectedJornada] = useState('')
  const [selectedEtapa, setSelectedEtapa] = useState('')

  const searchGroupsByName = (searchValue) => {
    setSearchValue(searchValue)

    // Filtrar las solicitudes según el nombre, el número de ficha y el estado seleccionado
    const filteredResults = fichas.filter((item) => {
      const nombreMatches = item.nombre_programa.toLowerCase().includes(searchValue.toLowerCase())
      const idFichaMatches = item.numero_ficha.toString().includes(searchValue.toString())
      const jornadaMatches = selectedJornada === '' || item.jornada === selectedJornada
      const etapaMatches = selectedEtapa === '' || item.etapa_programa === selectedEtapa
      const estadoMatches = selectedEstado === '' || item.estado === selectedEstado

      return (nombreMatches || idFichaMatches) && estadoMatches && jornadaMatches && etapaMatches
    })

    // Ordenar la lista de resultados en función del estado sortOrder
    const sortedResults = [...filteredResults].sort((a, b) => {
      const nameA = a.nombre_programa.toLowerCase()
      const nameB = b.nombre_programa.toLowerCase()

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })

    setSearchResults(sortedResults)
  }

  // Filtrar las solicitudes por nombre, estado y jornada
  const filteredGroups = visibleCards.filter((item) => {
    const nombreMatches = item.nombre_programa.toLowerCase().includes(searchValue.toLowerCase())
    const idFichaMatches = item.numero_ficha.toString().includes(searchValue.toString())
    const estadoMatches = selectedEstado === '' || item.estado === selectedEstado
    const jornadaMatches = selectedJornada === '' || item.jornada === selectedJornada
    const etapaMatches = selectedEtapa === '' || item.etapa_programa === selectedEtapa

    return (nombreMatches || idFichaMatches) && estadoMatches && jornadaMatches && etapaMatches
  })

  return (
    <>
      {modalGroups && <ModalAddGroups modalAddGroups={isOpen} cerrarModal={modalAddGroups} reloadFetchState={setReloadFetch} />}

      <main className="flex h-screen">
        <Sliderbar />
        <Toaster position="top-right" closeButton richColors />
        <section className="w-screen overflow-auto">
          <header className="p-[1.5rem] grid grid-cols-3 place-items-end">
            <section className="w-[60%] col-span-2 right-0 relative">
              <Search
                ficha
                filtro={filtroVisible}
                placeholder={'Buscar ficha'}
                icon={<i className="fi fi-rr-settings-sliders relative cursor-pointer left-[-3rem]" onClick={() => setFiltroVisible(!filtroVisible)} />}
                searchStudent={searchGroupsByName}
                searchResults={searchResults}
                searchValue={searchValue}
                selectedEstado={selectedEstado}
                setSelectedEstado={setSelectedEstado}
                setSelectedJornada={setSelectedJornada}
                setSelectedEtapa={setSelectedEtapa}
              />
            </section>
            <section className="w-full h-full flex items-center justify-center">
                <NotifyBadge />
            </section>
          </header>
          <section className="flex justify-center items-center mt-[16px]">
            <section className="flex justify-end items-center  bg-[#2e323e] w-[90%] rounded-xl py-2 px-3 ">
              {actualView === 'grid' ? (
                <>
                  <section className="pr-[3rem] flex">
                    <i
                      className={`fi fi-rr-list block cursor-pointer text-xl text-white opacity-100`}
                      onClick={() => {
                        toggleView()
                        toggleContent()
                        tableView('table')
                      }}
                    ></i>
                  </section>
                </>
              ) : (
                <section className="pr-[3rem] flex">
                  <i
                    className={`fi fi-rr-grid block cursor-pointer text-xl text-white opacity-100`}
                    onClick={() => {
                      toggleView()
                      toggleContent()
                      tableView('grid')
                    }}
                  ></i>
                </section>
              )}
              <select id="itemsPerPage" name="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="outline-none rounded-xl px-[8px] py-[5px]">
                <option value={6}>6 Elementos por página</option>
                <option value={12}>12 Elementos por página</option>
                <option value={24}>24 Elementos por página</option>
              </select>
            </section>
          </section>
          <section className="max-[935px]:h-screen max-sm:h-[200%] max-[935px]:p-5 min-h-[60vh]">
            <section className="mx-auto w-[90%]">
              {actualView === 'grid' ? (
                <section className="gap-8 grid grid-cols-3 mt-3 max-[935px]:w-full max-[935px]:grid-cols-2  max-sm:grid-cols-1">
                  {filteredGroups.map((card) => (
                    <Link to={`/students/${card.id_ficha}`} key={card.id_ficha} className="no-underline">
                      {/* Envuelve toda la tarjeta dentro del enlace */}
                      <Card className={`w-full h-[11.5rem] border-2 border-blue-200 ${hoveredCards[card.id_ficha] ? 'hovered' : ''}`} onMouseEnter={() => handleCardHover(card.id_ficha)} onMouseLeave={() => handleCardLeave(card.id_ficha)}>
                        <CardHeader className="gap-3 flex justify-center z-0">
                          <section className="flex bg-blue-200 py-2 justify-center items-center rounded-xl w-full">
                            <p className="text-xl font-bold ">{card.numero_ficha}</p>
                            <Tooltip
                              placements="bottom"
                              showArrow={true}
                              content={
                                <Button variant="light" color="danger" onClick={() => StateGroups(card.id_ficha)}>
                                  Desactivar ficha
                                </Button>
                              }
                            >
                              <i className="fi fi-br-menu-dots-vertical relative left-[30%]"></i>
                            </Tooltip>
                          </section>
                        </CardHeader>
                        <CardBody className="h-[5rem] pt-0 pb-0">
                          <p className="text-[16px]">{card.nombre_programa}</p>
                        </CardBody>

                        <CardFooter>
                          <p className="text-gray-500 text-md">{card.nombre_coordinador + ' ' + card.apellido_coordinador}</p>
                        </CardFooter>
                      </Card>

                      <section className={`animate-appearance-in mt-[-11rem] ml-[2.5rem] z-10 p-4 w-[14rem] shadow-lg rounded-xl bg-blue-300 text-white  ${hoveredCards[card.id_ficha] ? '' : 'hidden'}`}>
                        <p className="font-bold">
                          Jornada: <span className="font-normal">{card.jornada}</span>
                        </p>
                        <p className="font-bold">
                          Etapa: <span className="font-normal">{card.etapa_programa}</span>
                        </p>
                      </section>
                    </Link>
                  ))}
                </section>
              ) : (
                <section className="w-full flex justify-center mt-3">
                  <section className="shadow-md  border-1 border-default-300 p-[1rem] bg-white rounded-2xl w-full overflow-auto">
                    <table className="w-full">
                      <thead className="text-default-500">
                        <tr className="grid grid-cols-6-column-table text-sm place-items-start bg-default-100 p-2 rounded-lg font-thin ">
                          <th>N° Ficha</th>
                          <th>Programa formación</th>
                          <th>Jornada</th>
                          <th>Etapa</th>
                          <th>Coordinador</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGroups.map((card) => (
                          <Link to={`/students/${card.id_ficha} `} key={card.id_ficha}>
                            <tr className="grid grid-cols-6-column-table text-sm text-default-700 p-2 place-content-center hover:bg-blue-200 hover:rounded-xl  mt-[.5rem] transition-transform duration-200 ease-in-out transform hover:scale-[1.02] items-center">
                              <td>{card.numero_ficha}</td>
                              <td>{card.nombre_programa}</td>
                              <td>{card.jornada}</td>
                              <td>{card.etapa_programa}</td>
                              <td>{card.nombre_coordinador + ' ' + card.apellido_coordinador}</td>
                              <td className="z-100">
                                <Chip size="sm" color="success" variant="flat" radius="full" key={'activo'}>
                                  Activo
                                </Chip>
                              </td>
                            </tr>
                          </Link>
                        ))}
                      </tbody>
                    </table>
                  </section>
                </section>
              )}
            </section>
          </section>
          <section className="grid place-items-center  pt-[1rem] mb-[2rem]">
            <Pagination className={`relative z-0 max-[935px]:pb-[3rem] `} total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={totalPages} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-[59px]">
            <button className="w-[13rem] h-[60px] rounded-3xl text-white shadow-2xl  bg-[#2e323e] relative cursor-pointer outline-none border-none active:bg-[#87a0ec] active:transform active:scale-90 transition duration-150 ease-in-out" onClick={modalAddGroups}>
              <p className="text-[15px] top-0 block">
                <i className="fi fi-br-plus block" />
                Agregar fichas
              </p>
            </button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Groups }
