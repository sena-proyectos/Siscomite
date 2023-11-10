/* Importaciones de modulos y componentes */
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Pagination, Tooltip, Chip, Popover, PopoverTrigger, PopoverContent, Button, Divider } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { ModalAddGroups } from '../Utils/Modals/ModalAddGroup'
import { changeStateGroups, getFichas } from '../../api/httpRequest'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'
import './Groups.css'

import { Toaster, toast } from 'sonner'
import sw from 'sweetalert2'

/* Definicion del componente */
const Groups = () => {
  /* Estado y variables de estado del componente */
  // const [isOpen] = useState(false)
  const [fichas, setFichas] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [actualView, setActualView] = useState(null)
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(true) // Estado para controlar la visibilidad de la tabla y las cards

  const [hoveredCards, setHoveredCards] = useState({})
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6) // Establece un valor predeterminado de fichas a mostrar
  const [searchValue, setSearchValue] = useState('') // Estado para el valor de búsqueda
  const [selectedEstado, setSelectedEstado] = useState('') // Estado inicial vacío para el filtro de estado la solicitud
  const [selectedJornada, setSelectedJornada] = useState('')
  const [selectedEtapa, setSelectedEtapa] = useState('')
  const [sortOrder, setSortOrder] = useState('asc') // Estado para rastrear el orden de clasificación

  // Hacer uso de la funcion obtener fichas
  useEffect(() => {
    getFicha()
  }, [])

  /* Funcion para obtener las fichas guardadas en la base de datos */
  const getFicha = async () => {
    try {
      const response = await getFichas()
      const res = response.data.result
      setFichas(res)
    } catch (error) {}
  }

  // Paginación
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

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
  // Función para filtrar por nombre y número de ficha
  const filterNames = (searchValue) => {
    setSearchValue(searchValue)

    if (!searchValue) {
      getFicha()
    } else {
      const filterFichas = fichas.filter((item) => {
        const nombre = item.nombre_programa.toLowerCase().toUpperCase().includes(searchValue.toLowerCase().toUpperCase())
        const numero = item.numero_ficha.toString().includes(searchValue.toString())

        return nombre || numero
      })
      setFichas(filterFichas)
    }
  }

  // Función para filtrar las fichas por estado, jornada y etapa
  const filterFichas = () => {
    // Filtrar fichas por estado, jornada y etapa
    let filteredFichas = fichas

    if (selectedEstado) {
      filteredFichas = filteredFichas.filter((ficha) => ficha.estado.toLowerCase() === selectedEstado.toLowerCase())
    }

    if (selectedJornada) {
      filteredFichas = filteredFichas.filter((ficha) => ficha.jornada.toLowerCase() === selectedJornada.toLowerCase())
    }

    if (selectedEtapa) {
      filteredFichas = filteredFichas.filter((ficha) => ficha.etapa_programa.toLowerCase() === selectedEtapa.toLowerCase())
    }
    // Actualizar la lista de fichas después de aplicar los filtros
    setFichas(filteredFichas)
  }

  // Función para ordenar la lista de fichas por nombre
  const sortFichasByName = () => {
    const sortedFichas = [...fichas]
    sortedFichas.sort((a, b) => {
      const nameA = a.nombre_programa.toLowerCase()
      const nameB = b.nombre_programa.toLowerCase()
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })

    // Cambiar el orden de clasificación para la próxima vez
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')

    setFichas(sortedFichas)
  }

  // Función para aplicar filtros
  const applyFilters = () => {
    filterFichas()
  }

  // Función para limpiar los filtros
  const clearFilter = () => {
    setSelectedEstado('')
    setSelectedJornada('')
    setSelectedEtapa('')
    getFicha() // Recarga las fichas originales
  }
  return (
    <>
      {modalGroups && <ModalAddGroups cerrarModal={modalAddGroups} reloadFetchState={getFicha} />}

      <main className="flex h-screen">
        <Sliderbar />
        <Toaster position="top-right" closeButton richColors />
        <section className="w-screen overflow-auto">
          <header className="p-[1.5rem] grid grid-cols-3 place-items-end">
            <section className="w-[60%] col-span-2 right-0 relative">
              <Search placeholder={'Buscar ficha'} icon={<i className="fi fi-br-search relative left-[-3rem]" />} searchUser={filterNames} searchValue={searchValue} />
            </section>
            <section className="w-full h-full flex items-center justify-center">
              <NotifyBadge />
            </section>
          </header>
          <section className="flex justify-center items-center mt-[16px]">
            <section className="flex justify-between items-center  bg-[#2e323e] w-[90%] rounded-xl py-2 px-3 ">
              <section>
                <Button onClick={sortFichasByName} color="primary" variant="shadow" className="mr-2 text-lg">
                  {sortOrder === 'asc' ? <i className="fi fi-rr-sort-alpha-up cursor-pointer" /> : <i className="fi fi-sr-sort-alpha-down-alt cursor-pointer" />}
                </Button>
                <Popover placement="right">
                  <PopoverTrigger>
                    <Button className="text-[15px] font-bold">
                      <i className="fi fi-rr-settings-sliders relative cursor-pointer " />
                      Filtros
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <section className="px-1 py-2 flex flex-col gap-y-4">
                      <p className="font-semibold text-default-400">
                        Filtrar por
                        <i className="fi fi-sr-filter ml-2 text-sm" />
                      </p>
                      <Divider />
                      <select name="estado" onChange={(e) => setSelectedEstado(e.target.value)} value={selectedEstado} className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                        <option value="">Estado</option>
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                      </select>

                      <select name="jornada" onChange={(e) => setSelectedJornada(e.target.value)} value={selectedJornada} className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                        <option value="">Jornada</option>
                        <option value="MAÑANA">Mañana</option>
                        <option value="TARDE">Tarde</option>
                        <option value="NOCHE">Noche</option>
                        <option value="VIRTUAL">Virtual</option>
                        <option value="FINES DE SEMANA">Fines de semana</option>
                      </select>
                      <select name="etapa" onChange={(e) => setSelectedEtapa(e.target.value)} value={selectedEtapa} className="bg-gray-50 border border-gray-300 text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none">
                        <option value="">Etapa</option>
                        <option value="LECTIVA">Lectiva</option>
                        <option value="PRÁCTICA">Práctica</option>
                      </select>
                      <section className="flex">
                        <Button className="ml-3" color="primary" variant="light" onClick={clearFilter}>
                          <i className="fi fi-rr-eraser " />
                          Limpiar
                        </Button>
                        <Button className="ml-3" color="success" variant="light" onClick={applyFilters}>
                          <i className="fi fi-br-check" />
                          Aplicar
                        </Button>
                      </section>
                    </section>
                  </PopoverContent>
                </Popover>
              </section>

              <section className="flex items-center">
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
                <select id="itemsPerPage" name="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className="px-3 inline-flex shadow-lg  bg-default-100 h-unit-10 rounded-medium items-start justify-center gap-0 outline-none py-2 border border-[#0b0b9771]-">
                  <option value={6}>6 Elementos por página</option>
                  <option value={12}>12 Elementos por página</option>
                  <option value={24}>24 Elementos por página</option>
                </select>
              </section>
            </section>
          </section>
          <section className="max-[935px]:p-5 min-h-[60vh]">
            <section className="mx-auto w-[90%]">
              {actualView === 'grid' ? (
                <section className="gap-8 grid grid-cols-3 mt-3 min-h-[50vh] max-[935px]:w-full max-[935px]:grid-cols-2  max-sm:grid-cols-1">
                  {visibleCards.length === 0 ? <h1 className="grid place-content-center col-span-3 text-center text-gray-600">No se encontró la ficha</h1> : ''}
                  {visibleCards.map((card) => (
                    <Link to={`/students/${card.id_ficha}`} key={card.id_ficha} className="no-underline">
                      {/* Envuelve toda la tarjeta dentro del enlace */}
                      <section className="relative flex flex-col ">
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
                        <section className={`animate-appearance-in absolute z-10 p-4 w-[12rem] shadow-lg rounded-xl bg-blue-300 text-white ${hoveredCards[card.id_ficha] ? '' : 'hidden'}`}>
                          <p className="font-bold">
                            Jornada: <span className="font-normal">{card.jornada}</span>
                          </p>
                          <p className="font-bold">
                            Etapa: <span className="font-normal">{card.etapa_programa}</span>
                          </p>
                        </section>
                      </section>
                    </Link>
                  ))}
                </section>
              ) : (
                <section className="w-full flex justify-center mt-3">
                  <section className="shadow-md  border-1 border-default-300 p-[1rem] bg-white rounded-2xl w-full overflow-auto">
                    <table className="w-full overflow-auto">
                      <thead className="text-default-500">
                        <tr className="grid grid-cols-6-column-table text-sm place-items-start bg-default-100 p-2 rounded-lg font-thin ">
                          <th className="px-3 whitespace-nowrap datransition-colors">N° Ficha</th>
                          <th className="px-3 whitespace-nowrap datransition-colors">Programa formación</th>
                          <th className="px-3 whitespace-nowrap datransition-colors">Jornada</th>
                          <th className="px-3 whitespace-nowrap datransition-colors">Etapa</th>
                          <th className="px-3 whitespace-nowrap datransition-colors">Coordinador</th>
                          <th className="px-3 whitespace-nowrap datransition-colors">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleCards.length === 0 ? <h1 className="p-[1rem] text-center text-gray-600">No existen fichas registradas</h1> : ''}
                        {visibleCards.map((card) => (
                          <Link to={`/students/${card.id_ficha} `} key={card.id_ficha}>
                            <tr className="grid grid-cols-6-column-table text-sm text-default-700 p-2 place-content-center hover:bg-blue-200 hover:rounded-xl  mt-[.5rem] transition-transform duration-200 ease-in-out transform hover:scale-[1.02] items-center">
                              <td className="px-3 relative  whitespace-normal text-small">{card.numero_ficha}</td>
                              <td className="px-3 relative whitespace-normal text-small">{card.nombre_programa}</td>
                              <td className="px-3 relative whitespace-normal text-small">{card.jornada}</td>
                              <td className="px-3 relative whitespace-normal text-small">{card.etapa_programa}</td>
                              <td className="px-3 relative whitespace-normal text-small">{card.nombre_coordinador + ' ' + card.apellido_coordinador}</td>
                              <td className="z-100">
                                <Chip size="sm" color={card.estado === 'ACTIVO' ? 'success' : 'danger'} variant="flat" radius="full" key={'activo'}>
                                  {card.estado}
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
            <button className="w-[13rem] max-[800px]:w-[5rem] h-[60px] rounded-3xl text-white shadow-2xl  bg-[#2e323e] relative cursor-pointer outline-none border-none active:bg-[#87a0ec] active:transform active:scale-90 transition duration-150 ease-in-out" onClick={modalAddGroups}>
              <i className="fi fi-br-plus" />
              <p className="text-[15px] top-0 max-[800px]:hidden">Agregar fichas</p>
            </button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Groups }
