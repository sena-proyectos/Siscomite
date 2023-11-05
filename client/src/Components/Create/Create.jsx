// Importación de módulos y componentes necesarios
import './Create.css'
import React, { useEffect, useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Card, CardBody, Textarea, CheckboxGroup, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio, Tooltip, Tabs, Tab } from '@nextui-org/react'
import { Search } from '../Search/Search'
import { getTeacherByName, getApprenticesByName, getApprenticesById, getCoordination, getInstructorById, getRules, createRequest } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'
import { userInformationStore } from '../../store/config'
import { useNavigate } from 'react-router-dom'

// Definición del componente Create
const Create = () => {
  // Estados para manejar la selección de opciones y resultados de búsqueda
  const [teacherSearch, setTeacherSearch] = useState([])
  const [userSearch, setUserSearch] = useState([])
  const [error, setError] = useState(null)
  const [errorUser, setErrorUser] = useState(null)

  const [selectedApprentice, setSelectedApprentice] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])

  const [numSeleccionados, setNumSeleccionado] = useState([])

  const [coordination, setCoordination] = useState([])

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['Coordinador']))
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).map((key) => key.replace(/_/g, ' ')), [selectedKeys])

  // Estados para manejar la selección de opciones y resultados de búsqueda
  const [selectedFalta, setSelectedFalta] = React.useState(new Set(['Calificación']))
  const selectedValueFalta = React.useMemo(() => Array.from(selectedFalta).join(', ').replaceAll('_', ' '), [selectedFalta])

  const [tipoSolicitud, setTipoSolicitud] = useState(null)
  const [descripcion, setDescripcion] = useState(null)

  const [selectFile, setSelectFile] = useState()
  const Navigate = useNavigate()

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
      const message = error.response?.data?.message || 'No se encontró al instructor'
      setError(message)
      setTeacherSearch([])
    }
  }

  // Función para buscar aprendices
  const getUser = async (nombres) => {
    try {
      if (nombres.trim() === '') {
        setUserSearch([])
        setErrorUser(null)
        return
      } else {
        setErrorUser(null)
        const response = await getApprenticesByName(nombres)

        setUserSearch(response.data.user)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'No se encontró al aprendiz'
      setErrorUser(message)
      setUserSearch([])
    }
  }

  // Efecto para obtener el ID del usuario a partir de un token
  useEffect(() => {
    coordinations()
  }, [])

  const { userInformation } = userInformationStore()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    setSelectFile(file)
  }

  const sendData = async () => {
    try {
      const solicitudFormData = new FormData()
      solicitudFormData.append('tipo_solicitud', tipoSolicitud)
      solicitudFormData.append('nombre_coordinacion', selectedValue.join(', '))
      solicitudFormData.append('id_usuario_solicitante', `${userInformation.id_usuario}`)
      solicitudFormData.append('descripcion_caso', descripcion)
      solicitudFormData.append('calificacion_causa', selectedValueFalta)
      solicitudFormData.append('categoria_causa', 'Academica')

      // Agrega los IDs de los aprendices seleccionados al FormData
      selectedApprentice.forEach((item) => {
        const dataApprentice = item.nombres_aprendiz + '_' + item.apellidos_aprendiz + '_' + item.numero_documento_aprendiz

        solicitudFormData.append('aprendicesSeleccionados', [item.id_aprendiz])
        solicitudFormData.append('dataApprentice', dataApprentice)
      })

      // Agrega los IDs de los instructores seleccionados al FormData
      selectedInstructor.forEach((item) => {
        solicitudFormData.append('instructoresSeleccionados', [item.id_usuario])
      })

      // Agrega los IDs de los numerales seleccionados al FormData
      numSeleccionados.forEach((numeralId) => {
        solicitudFormData.append('numeralesSeleccionados', [numeralId])
      })

      solicitudFormData.append('archivo', selectFile)

      /* Validaciones al crear la solicitud */
      /* Validación del archivo PDF */
      if (!selectFile) {
        toast.error('Opss!!', {
          description: 'Debe subir su archivo PDF con las evidencias de la solicitud.'
        })
        return
      }

      /* Validación de la calificación de la solicitud */
      if (selectedValueFalta === 'Calificación') {
        toast.error('Opss!!', {
          description: 'Debe seleccionar cuál es la calificación de la falta.'
        })
        return
      }

      /* Validación de la descripción del caso de la solicitud */
      if (!descripcion) {
        toast.error('Opss!!', {
          description: 'Es obligatorio especificar la descripción del caso.'
        })
        return
      }
      // Envia la solicitud con el ID del archivo
      const response = await createRequest(solicitudFormData)

      /* Enviamos mensaje de respuesta */
      const res = response?.data?.message
      toast.success('Genial!!', {
        description: res
      })
      setTimeout(() => {
        Navigate('/requests')
      }, 3000)
    } catch (error) {
      /* Enviamos respuesta errónea en caso de que exista */
      const message = error.response?.data?.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  /* Función para obtener los instructores */
  const coordinations = async () => {
    try {
      const response = await getCoordination()
      const res = response.data.result
      setCoordination(res)
    } catch (error) {
      toast.error('¡Opss!', {
        description: 'Error al cargar las Coordinaciones'
      })
    }
  }

  // Función para manejar el clic en un instructor
  const handleTeacherClick = async (idInstructor) => {
    // Verifica si el instructor ya ha sido seleccionado
    if (selectedInstructor.some((instructor) => instructor.id_usuario === idInstructor)) {
      toast.error('Opss!!', {
        description: 'Este instructor ya ha sido seleccionado.'
      })
      return
    }

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
    } catch (error) {}
  }

  // Función para manejar el clic en un aprendiz
  const handleUserClick = async (userId) => {
    // Verifica si el aprendiz ya ha sido seleccionado
    if (selectedApprentice.some((apprentice) => apprentice.id_aprendiz === userId)) {
      toast.error('Opss!!', {
        description: 'Este aprendiz ya ha sido seleccionado.'
      })
      return
    }

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
    } catch (error) {}
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
      toast.error('¡Opss!', {
        description: 'Error al obtener el reglamento'
      })
    }
  }

  // Función para manejar cambios en la selección de checkboxes de numerales
  const handleNumeralChange = (e, numeralId) => {
    const checked = e.target.checked

    if (checked) {
      // Si el checkbox se marca, agrega el numeralId al estado numSeleccionados
      setNumSeleccionado((prevSelected) => [...prevSelected, numeralId])
    } else {
      // Si el checkbox se desmarca, elimina el numeralId del estado numSeleccionados
      setNumSeleccionado((prevSelected) => prevSelected.filter((numeral) => numeral !== numeralId))
    }
  }

  return (
    <main className="relative flex h-screen ">
      <Toaster position="top-right" closeButton richColors />
      <Sliderbar />
      <form className="w-full overflow-auto" onSubmit={sendData}>
        <header className="grid place-items-center py-[.5rem] relative top-[.5rem]">
          <section className="flex justify-center w-[90%]">
            <h1 className="text-2xl font-semibold">Crear solicitud</h1>
            <section className="absolute right-[20%] flex justify-center z-20">
              <NotifyBadge />
            </section>
          </section>

          <section className="bg-white relative top-[1rem] place-items-center  grid grid-cols-3  min-w-[90%] p-[.5rem] shadow-lg rounded-xl ">
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
                  <DropdownItem key="gravísima">Gravísima</DropdownItem>
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
        <section className="grid grid-cols-2 gap-4 mx-[4rem] mt-[1rem] max-[750px]:grid max-[750px]:grid-cols-1">
          <section className="h-full ">
            <section className="relative mt-2">
              <Search placeholder={'Buscar Instructor'} icon={<i className="fi fi-br-search relative cursor-pointer right-[3rem]" />} searchUser={getTeacher} />
              <section className="bg-[#2E323E] w-[97%] relative shadow-lg top-[.5rem] rounded-xl  ">
                <h3 className="grid justify-center text-white ">Instructores</h3>
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
                        <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover-bg-blue-900 rounded-lg p-2" key={item.id_usuario}>
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
              <Search className="relative w-full" placeholder={'Buscar aprendiz'} icon={<i className="fi fi-br-search relative cursor-pointer right-[3rem]" />} searchUser={getUser} />
              <section className="bg-[#2E323E] w-[97%] relative shadow-lg top-[.5rem] rounded-xl">
                <h3 className="grid justify-center text-white">Aprendices</h3>
                <section className="text-white relative mx-5 w-[90%] border-t-2 border-blue-500 p-1 overflow-auto max-h-[10rem]">
                  {(userSearch.length > 0 || selectedApprentice.length > 0) && errorUser === null ? (
                    <>
                      {userSearch.map((item) => (
                        <Tooltip color="success" content="Agregar aprendiz" placement="right" key={item.id_aprendiz}>
                          <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover-bg-blue-900 rounded-lg p-2" onClick={() => handleUserClick(item.id_aprendiz)}>
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
                        <ul className="flex justify-between text-[13px] py-[.5rem] cursor-pointer hover-bg-blue-900 rounded-lg p-2 " key={item.id_aprendiz}>
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
            <section className="py-[.5rem] relative top-[2.1rem] place-items-center grid grid-cols-2 gap-4 max-[900px]:grid max-[900px]:grid-cols-1">
              <section className=" w-full">
                <Textarea label="Descripción" labelPlacement="outside" placeholder="Ingresa tu descripción" className="max-w-[300px] max-[800px]:max-w-full" onChange={(e) => setDescripcion(e.target.value)} />
              </section>
              <section className="">
                <Tooltip showArrow={true} color="danger" content="La evidencia tiene que ser en un PDF">
                  <label className="inline-block bg-[#2E323E] text-white w-[12rem] p-[16px] rounded-xl cursor-pointer select-none text-center">
                    {selectFile ? `Evidencia Subida` : 'Subir evidencia'}
                    <i className="fi fi-rr-upload px-[.5rem]" />
                    <input type="file" id="archivo" name="archivo" className="hidden" onChange={handleFileChange} accept=".pdf" />
                  </label>
                </Tooltip>
              </section>
            </section>
          </section>

          <section className=" h-full max-[900px]:mt-[3rem] mt-2">
            <section className="flex w-full h-full flex-col max-[900px]:mt-[]">
              <Tabs>
                <Tab key="academica" title="Acádemicas">
                  <Card className="overflow-auto max-h-[50vh] max-[900px]:w-full">
                    <CardBody className="gap-1">
                      <CheckboxGroup>
                        {rules.map((item) => (
                          <React.Fragment key={item.id_numeral}>
                            <strong>{item.titulo_capitulo}</strong>
                            <p>{item.numero_articulo}</p>
                            <Checkbox value={item.id_numeral} className="flex items-start" checked={numSeleccionados.includes(item.id_numeral)} onChange={(e) => handleNumeralChange(e, item.id_numeral)}>
                              <strong> {item.numero_numeral}. </strong>
                              {item.descripcion_numeral}
                            </Checkbox>
                          </React.Fragment>
                        ))}
                      </CheckboxGroup>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </section>
          </section>
        </section>
        <section className="grid place-items-center relative top-[2rem] max-[900px]:pb-[3rem]">
          <Button className="" size="md" color="primary" onClick={sendData}>
            Enviar
            <i className="fi fi-br-check"></i>
          </Button>
        </section>
        <Footer />
      </form>
    </main>
  )
}

export { Create }
