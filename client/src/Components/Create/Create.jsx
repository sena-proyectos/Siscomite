// Importación de módulos y componentes necesarios
import './Create.css'
import React, { useEffect, useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Notify } from '../Utils/NotifyBar/NotifyBar'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Card, CardBody, Textarea, CheckboxGroup, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio, Tooltip, Tabs, Tab } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { getTeacherByName, getApprenticesByName, getApprenticesById, getCoordination, getInstructorById, getRules, createRequest } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'
import { userInformationStore } from '../../store/config'

// Definición del componente Create
const Create = () => {
  // Estados para manejar la selección de opciones y resultados de búsqueda
  const [teacherSearch, setTeacherSearch] = useState([])
  const [userSearch, setUserSearch] = useState([])
  const [error, setError] = useState(null)
  const [errorUser, setErrorUser] = useState(null)
  const [userID, setUserID] = useState('')

  const [selectedApprentice, setSelectedApprentice] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])

  const [numSeleccionados, setNumseleccionado] = useState([])

  const [coordination, setCoordination] = useState([])

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['Coordinador']))
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).map((key) => key.replace(/_/g, ' ')), [selectedKeys])

  // estados para manejar la selección de opciones y resultados de búsqueda
  const [selectedFalta, setSelectedFalta] = React.useState(new Set(['Calificación']))
  const selectedValueFalta = React.useMemo(() => Array.from(selectedFalta).join(', ').replaceAll('_', ' '), [selectedFalta])

  const [tipoSolicitud, setTipoSolicitud] = useState(null)
  const [descripcion, setDescripcion] = useState(null)

  /* Estado para almacenar el reglamento obtenido de la base de datos */
  const [rules, setRules] = useState([])

  // Función para buscar instructores
  const getTeacher = async (nombres) => {
    try {
      if (nombres.trim() === '') {
        setTeacherSearch([])
        setError(null)
        return
      } else {
        setError(null)
        const response = await getTeacherByName(nombres)
        setTeacherSearch(response.data.user)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'No se encontro al instructor'
      setError(message)
      setTeacherSearch([])
    }
  }

  // Función para buscar aprendices
  const getUser = async (nombres) => {
    try {
      if (nombres.trim() === '') {
        setUserSearch([])
        setError(null)
        return
      } else {
        setErrorUser(null)
        const response = await getApprenticesByName(nombres)
        setUserSearch(response.data.user)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'No se encontro al aprendiz'
      setErrorUser(message)
      setUserSearch([])
    }
  }

  // Efecto para obtener el ID del usuario a partir de un token
  useEffect(() => {
    coordinations()
  }, [])

  const { userInformation } = userInformationStore()

  // Función para enviar datos
  const sendData = async () => {
    const dataValue = {
      tipo_solicitud: tipoSolicitud, // Agregar el valor del radio
      nombre_coordinacion: selectedValue.join(', '), // Agregar el valor del dropdown
      id_usuario_solicitante: `${userInformation.id_usuario}`,
      descripcion_caso: descripcion,
      calificacion_causa: selectedValueFalta,
      aprendicesSeleccionados: selectedApprentice.map((item) => item.id_aprendiz),
      instructoresSeleccionados: selectedInstructor.map((item) => item.id_usuario),
      numeralesSeleccionados: numSeleccionados,
      categoria_causa: 'Academica',
      id_archivo: '13'
    }
    console.log(dataValue)
    try {
      const response = await createRequest(dataValue)
      const res = response.data.message
      toast.success('Genial!!', {
        description: res
      })
    } catch (error) {
      const message = error.response.data.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  /* Funcion para obtener los instructores */
  const coordinations = async () => {
    try {
      const response = await getCoordination()
      const res = response.data.result
      setCoordination(res)
    } catch (error) {
      console.log('Error al cargar las Coordinaciones')
    }
  }

  // Función para manejar el clic en un instructor
  const handleTeacherClick = async (idInstructor) => {
    try {
      const response = await getInstructorById(idInstructor)
      const [res] = response.data.result

      if (tipoSolicitud === 'Individual' && selectedInstructor.length > 0) {
        toast.error('Opss!!', {
          description: 'Solo puede seleccionar un instructor en una solicitud individual'
        })
        return
      }
      if (tipoSolicitud === null) {
        toast.error('Opss!!', {
          description: 'No se puede elegir a un instructor sin antes determinar si se trata de un proceso individual o grupal.'
        })
        return
      }

      /* Extender el array y agregar el nuevo */
      setSelectedInstructor([...selectedInstructor, res])
      setTeacherSearch([])
    } catch (error) {
      console.error('Error obteniendo detalles del instructor:', error)
    }
  }

  // Función para manejar el clic en un aprendiz
  const handleUserClick = async (userId) => {
    try {
      const response = await getApprenticesById(userId)
      const [res] = response.data.result

      if (tipoSolicitud === 'Individual' && selectedApprentice.length > 0) {
        toast.error('Opss!!', {
          description: 'Solo puede seleccionar un aprendiz en una solicitud individual'
        })
        return
      }
      if (tipoSolicitud === null) {
        toast.error('Opss!!', {
          description: 'No se puede elegir a un aprendiz sin antes determinar si se trata de un proceso individual o grupal.'
        })
        return
      }

      // Extender el array selectedApprentice con los nuevos detalles
      setSelectedApprentice([...selectedApprentice, res])

      setUserSearch([])
    } catch (error) {
      console.error('Error obteniendo detalles del aprendiz:', error)
    }
  }

  // Función para eliminar aprendices seleccionados
  const removeApprentices = (apprenticeId) => {
    setSelectedApprentice((prevApprentices) => {
      // Filtrar el arreglo previo para eliminar el aprendiz con el ID especificado
      return prevApprentices.filter((apprentice) => apprentice.id_aprendiz !== apprenticeId)
    })
  }
  const removeInstructors = (userId) => {
    setSelectedInstructor((prevInstructors) => {
      // Filtrar el arreglo previo para eliminar el instructor con el ID especificado
      return prevInstructors.filter((instructor) => instructor.id_usuario !== userId)
    })
  }

  // Utiliza un useEffect para realizar acciones de obtener reglamento
  useEffect(() => {
    getRule()
  }, []) // Este useEffect se ejecutará cada vez que se renderice el componente

  const getRule = async () => {
    try {
      const response = await getRules()
      const res = response.data.result
      setRules(res)
    } catch (error) {
      console.log(error)
    }
  }

  // Estado y función para controlar la barra de notificaciones
  const [notifyOpen, setNotifyOpen] = useState(false)

  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }

  // Función para manejar cambios en la selección de checkboxes de numerales
  const handleNumeralChange = (e, numeralId) => {
    const checked = e.target.checked

    if (checked) {
      // Si el checkbox se marca, agrega el numeralId al estado numSeleccionados
      setNumseleccionado((prevSelected) => [...prevSelected, numeralId])
    } else {
      // Si el checkbox se desmarca, elimina el numeralId del estado numSeleccionados
      setNumseleccionado((prevSelected) => prevSelected.filter((numeral) => numeral !== numeralId))
    }
  }

  return (
    <main className="relative h-screen flex ">
      <Toaster position="top-right" closeButton richColors />
      <Sliderbar />
      <section className="w-full overflow-auto">
        <section className="fixed z-20 w-[20rem] right-0">
          <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
        </section>
        <header className="grid place-items-center py-[.5rem] relative top-[.5rem]">
          <section className="flex">
            <h1 className="text-2xl font-semibold">Crear solicitud</h1>
            <section className="absolute right-[15%] cursor-pointer ">
              {notifyOpen ? (
                <></>
              ) : (
                <>
                  <section className="bg-blue-200 rounded-full w-[2rem] h-[2rem] grid place-items-center" onClick={toggleNotify}>
                    <i className="fi fi-ss-bell text-blue-400 p-[.3rem] " />
                  </section>
                </>
              )}
            </section>
          </section>
          <section className="bg-white relative top-[1rem] place-items-center  grid grid-cols-3 gap-[6rem]  w-[90%] p-[.5rem] p shadow-lg rounded-xl">
            <section>
              <RadioGroup orientation="horizontal" onChange={(e) => setTipoSolicitud(e.target.value)}>
                <Radio value="Grupal">Grupal</Radio>
                <Radio value="Individual">Individual</Radio>
              </RadioGroup>
            </section>

            <section>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" className="capitalize" color="primary">
                    {selectedValueFalta}
                    <i className="fi fi-rr-angle-small-down text-[1.5rem]" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedFalta={selectedFalta} onSelectionChange={setSelectedFalta}>
                  <DropdownItem key="leve">Leve</DropdownItem>
                  <DropdownItem key="grave">Grave</DropdownItem>
                  <DropdownItem key="gravísimas">Gravísimas</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </section>

            <section>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" className="capitalize" color="primary">
                    {selectedValue}
                    <i className="fi fi-rr-angle-small-down text-[1.5rem]" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                  {coordination.map((item) => (
                    <DropdownItem key={item.nombres + ' ' + item.apellidos}>{item.nombres + ' ' + item.apellidos}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </section>
          </section>
        </header>
        <section className=" relative top-[1.6rem] place-items-center grid grid-cols-2  gap-0 ">
          <section className="w-[85%] ml-[3rem] h-full ">
            <section className=" relative ">
              <Search className="relative " placeholder={'Buscar Instructor'} icon={<i className="fi fi-br-search relative cursor-pointer right-[3rem]" />} searchStudent={getTeacher} />
              <section className="bg-[#2E323E] w-[97%] relative shadow-lg top-[.5rem] rounded-xl  ">
                <h3 className="text-white grid justify-center ">Instructores</h3>
                <section className="text-white relative mx-5 w-[90%] border-t-2 border-blue-500 p-1  max-h-[10rem]">
                  {(teacherSearch.length > 0 || selectedInstructor.length > 0) && error === null ? (
                    <>
                      {teacherSearch.map((item) => (
                        <Tooltip color="success" content="Agregar instructor" placement="right" key={item.id_usuario}>
                          <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover:bg-blue-900 rounded-lg p-2" onClick={() => handleTeacherClick(item.id_usuario)}>
                            <React.Fragment>
                              <li>{item.numero_documento}</li>
                              <li>{item.nombres + ' ' + item.apellidos}</li>
                              <li>
                                <i className="fi fi-rr-user-add text-green-500 text-[1rem]"></i>
                              </li>
                            </React.Fragment>
                          </ul>
                        </Tooltip>
                      ))}
                      {selectedInstructor.map((item) => (
                        <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover:bg-blue-900 rounded-lg p-2" key={item.id_usuario}>
                          <React.Fragment>
                            <li>{item.numero_documento}</li>
                            <li>{item.nombres + ' ' + item.apellidos}</li>
                            <li>
                              <Tooltip color="danger" content="Eliminar instructor" placement="right">
                                <i className="fi fi-br-remove-user text-red-500 text-[1rem]" onClick={() => removeInstructors(item.id_usuario)}></i>
                              </Tooltip>
                            </li>
                          </React.Fragment>
                        </ul>
                      ))}
                    </>
                  ) : (
                    <span className="text-white text-center py-[1rem] block">{error || 'Ningún instructor seleccionado'}</span>
                  )}
                </section>
              </section>
            </section>
            <section className="relative top-[1rem] ">
              <Search className="relative w-[100%]  " placeholder={'Buscar aprendiz'} icon={<i className="fi fi-br-search relative cursor-pointer right-[3rem]" />} searchStudent={getUser} />
              <section className="bg-[#2E323E] w-[97%] relative shadow-lg top-[.5rem] rounded-xl">
                <h3 className="text-white grid justify-center">Aprendices</h3>
                <section className="text-white relative mx-5 w-[90%] border-t-2 border-blue-500 p-1 overflow-auto max-h-[10rem]">
                  {(userSearch.length > 0 || selectedApprentice.length > 0) && errorUser === null ? (
                    <>
                      {userSearch.map((item) => (
                        <Tooltip color="success" content="Agregar aprendiz" placement="right" key={item.id_aprendiz}>
                          <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover:bg-blue-900 rounded-lg p-2" onClick={() => handleUserClick(item.id_aprendiz)}>
                            <React.Fragment>
                              <li>{item.numero_documento_aprendiz}</li>
                              <li>{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</li>
                              <li>
                                <i className="fi fi-rr-user-add text-green-500 text-[1rem]"></i>
                              </li>
                            </React.Fragment>
                          </ul>
                        </Tooltip>
                      ))}
                      {selectedApprentice.map((item) => (
                        <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover:bg-blue-900 rounded-lg p-2 " key={item.id_aprendiz}>
                          <React.Fragment>
                            <li>{item.numero_documento_aprendiz}</li>
                            <li>{item.nombres_aprendiz + ' ' + item.apellidos_aprendiz}</li>
                            <li>
                              <Tooltip color="danger" content="Eliminar aprendiz" placement="right">
                                <i className="fi fi-br-remove-user text-red-500 text-[1rem]" onClick={() => removeApprentices(item.id_aprendiz)}></i>
                              </Tooltip>
                            </li>
                          </React.Fragment>
                        </ul>
                      ))}
                    </>
                  ) : (
                    <span className="text-white text-center py-[1rem] block">{errorUser || 'Ningún aprendiz seleccionado'}</span>
                  )}
                </section>
              </section>
            </section>
            <section className="py-[.5rem] relative top-[2.1rem] place-items-center grid grid-cols-2 gap-4 ">
              <section className=" w-full">
                <Textarea label="Descripción" labelPlacement="outside" placeholder="Ingresa tu descripción" className="max-w-[300px]" onChange={(e) => setDescripcion(e.target.value)} />
              </section>
              <section className="">
                <Tooltip showArrow={true} color="danger" content="La evidencia tiene que ser en un PDF">
                  <label className="inline-block bg-[#2E323E] text-white p-[13px] rounded-xl cursor-pointer select-none">
                    Subir evidencia
                    <i className="fi fi-rr-upload px-[.5rem]" />
                    <input type="file" className="hidden" />
                  </label>
                </Tooltip>
              </section>
            </section>
          </section>

          <section className="mr-[3.1rem] w-[85%] h-full">
            <section className="flex w-full h-full flex-col">
              <Tabs>
                <Tab key="academica" title="Acádemicas">
                  <Card className="overflow-auto max-h-[50vh]">
                    <CardBody className="gap-1">
                      <CheckboxGroup>
                        {rules.map((item) => (
                          <React.Fragment key={item.id_numeral}>
                            <strong>{item.titulo_capitulo}</strong>
                            <p>{item.numero_articulo}</p>
                            <Checkbox value={item.id_numeral} className="flex items-start" checked={numSeleccionados.includes(item.id_numeral)} onChange={(e) => handleNumeralChange(e, item.id_numeral)}>
                              {item.descripcion_numeral}
                            </Checkbox>
                          </React.Fragment>
                        ))}
                      </CheckboxGroup>
                    </CardBody>
                  </Card>
                </Tab>
                {/*  <Tab key="disciplinarias" title="Disciplinarias">
                  <Card>
                    <CardBody>
                      <CheckboxGroup>
                        <Checkbox value="rules" className="flex  items-start">
                          Numerales
                        </Checkbox>
                        <Checkbox value="tati" className="flex  items-start">
                          Numerales
                        </Checkbox>
                      </CheckboxGroup>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="otros" title="Otros">
                  <Card>
                    <CardBody>
                      <CheckboxGroup>
                        <Checkbox value="rules" className="flex  items-start">
                          Numerales
                        </Checkbox>
                        <Checkbox value="tati" className="flex  items-start">
                          Numerales
                        </Checkbox>
                      </CheckboxGroup>
                    </CardBody>
                  </Card>
                </Tab> */}
              </Tabs>
            </section>
          </section>
        </section>
        <section className="grid place-items-center relative top-[2rem] ">
          <Button className="" size="md" color="primary" onClick={sendData}>
            Enviar
            <i className="fi fi-br-check"></i>
          </Button>
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Create }
