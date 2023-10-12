/* Importaciones de modulos y componentes */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Pagination, Tooltip, Input, Chip, Button } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { ModalAddGroups } from '../Utils/Modals/ModalAddGroup'
import { changeStateGroups, getFichas } from '../../api/httpRequest'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'
import { Toaster, toast } from 'sonner'
import sw from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

/* Definicion del componente */
const Test = ({ count, page, rowsPerPage, onChangePage }) => {
  /* Estado y variables de estado del componente */
  const [isOpen] = useState(false)
  const [fichas, setFichas] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [actualView, setActualView] = useState(null)
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(true) // Estado para controlar la visibilidad de la tabla y las cards
  const [hoveredCards, setHoveredCards] = useState({})

  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4) // Establece un valor predeterminado de fichas a mostrar
  const [searchValue, setSearchValue] = useState('') // Estado para el valor de búsqueda
  const [searchResults, setSearchResults] = useState([]) // Estado para los resultados de la búsqueda
  const [selectedEstado, setSelectedEstado] = useState('') // Estado inicial vacío para el filtro de estado la solicitud
  const [selectedJornada, setSelectedJornada] = useState('')
  const [selectedEtapa, setSelectedEtapa] = useState('')

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
    } catch (error) {
      console.error(error)
    }
  }

  // Paginación
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
  /* establecer paginado y numero de paginacion */
  const startIdx = (activePage - 1) * itemsPerPage
  const visibleCards = fichas.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(fichas.length / itemsPerPage)

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

  const filteredGroups = visibleCards.filter((item) => {
    const estadoMatches = selectedEstado === '' || item.estado === selectedEstado
    const jornadaMatches = selectedJornada === '' || item.jornada === selectedJornada
    const etapaMatches = selectedEtapa === '' || item.etapa_programa === selectedEtapa

    return estadoMatches && jornadaMatches && etapaMatches
  })

  const [selectedDate, setSelectedDate] = useState(null);
  const dateArray = [
    new Date('2023-10-01'),
    new Date('2023-10-05'),
    new Date('2023-10-10'),
    new Date('2023-10-15'),
    new Date('2023-10-20'),
    new Date('2023-10-25'),
  ];

   // Función para filtrar fechas
   const filteredDates = dateArray.filter((date) => {
    // Si no se ha seleccionado una fecha, muestra todas las fechas.
    if (!selectedDate) {
      return true;
    }

    // Compara las fechas para ver si coinciden.
    return date.toDateString() === selectedDate.toDateString();
  });

  return (
    <main className="h-screen w-full flex flex-col items-center">
      <header className="w-[50%] mt-[2rem]">
        <h2 className="font-bold text-2xl">Filtro prueba</h2>
        <Search
          ficha
          filtro={filtroVisible}
          placeholder={'Buscar ficha'}
          icon={<i className="fi fi-rr-settings-sliders relative cursor-pointer left-[-3rem]" onClick={() => setFiltroVisible(!filtroVisible)} />}
          searchUser={filterNames}
          searchResults={searchResults}
          searchValue={searchValue}
          setSelectedEstado={setSelectedEstado}
          setSelectedJornada={setSelectedJornada}
          setSelectedEtapa={setSelectedEtapa}
        />
      </header>
      <section className="h-full grid place-content-center">
        {filteredGroups.map((prueba) => {
          return (
            <ul key={prueba.id_ficha} className="flex gap-x-4">
              <li>{prueba.numero_ficha}</li>
              <li> {prueba.nombre_programa}</li>
              <li>{prueba.jornada}</li>
              <li>{prueba.etapa_programa}</li>
            </ul>
          )
        })}


        <Pagination className={`relative z-0 max-[935px]:pb-[3rem] `} total={totalPages || 1} initialPage={1} color={'primary'} totalitemscount={totalPages} onChange={handlePageChange} />
        <div>
      <h1>Date Picker y Filtrado de Fechas en React</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Selecciona una fecha"
      />
      <div>
        <h2>Fechas Filtradas</h2>
        <ul>
          {filteredDates.map((date, index) => (
            <li key={index}>{date.toDateString()}</li>
          ))}
        </ul>
      </div>
    </div>
      </section>
    </main>
  )
}

export { Test }
