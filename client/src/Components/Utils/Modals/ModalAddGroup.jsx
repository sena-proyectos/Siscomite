import { useState, useEffect } from 'react'
import { createFicha } from '../../../api/httpRequest'
import { Toaster, toast } from 'sonner'
import { Input, Button } from '@nextui-org/react'
import { getCoordination } from '../../../api/httpRequest'
import { Alerts } from '../Alerts/Alerts'
import { validationGroups } from '../../../Validations/validations'

export const ModalAddGroups = ({ cerrarModal, reloadFetchState }) => {
  /* Estados para capturar los valores de la ficha */
  const [numeroFicha, setNumeroFicha] = useState('')
  const [nombrePrograma, setNombrePrograma] = useState('')
  const [jornada, setJornada] = useState('')
  const [etapaPrograma, setEtapaPrograma] = useState('')
  const [numeroTrimestre, setNumeroTrimestre] = useState('')
  const [idModalidad, setIdmodalidad] = useState('')
  const [coordinadores, setCoordinadores] = useState('')

  const [coordination, setCoordination] = useState([])

  //Condiciones de agregar ficha
  const [isTrimestreEnabled, setIsTrimestreEnabled] = useState(false)

  // Funcion para activar el select de "Trimstre lectivo" dependiendo de lo seleciondo en "Etapa"
  const handleEtapaChange = (event) => {
    const selectedValue = event.target.value
    setEtapaPrograma(selectedValue)
    setIsTrimestreEnabled(selectedValue === 'Lectiva')
  }

  /* Enviar datos de las fichas */
  const sendDataFichas = async (e) => {
    e.preventDefault()

    try {
      const dataValue = {
        numero_ficha: numeroFicha,
        nombre_programa: nombrePrograma.toUpperCase(),
        jornada: jornada.toUpperCase(),
        etapa_programa: etapaPrograma.toUpperCase(),
        numero_trimestre: numeroTrimestre,
        id_modalidad: idModalidad,
        id_usuario_coordinador: coordinadores
      }
      // Realiza la validación de los datos utilizando la función "validate" de "validationGroups".
      // "dataValue" es el conjunto de datos a validar y "stripUnknown: true" elimina cualquier campo desconocido.
      const { error } = validationGroups.validate(dataValue, { stripUnknown: true })
      // Si hay un error de validación:
      if (error) {
        const errorDetails = error.details[0] // Obtén el primer detalle de error del objeto "error".

        if (!numeroFicha || !jornada || !etapaPrograma || !idModalidad || !coordinadores) {
          toast.error('Todos los campos tienen que ser rellenados')
        } else if (errorDetails.path[0] === 'numero_ficha') {
          toast.error('El número de ficha debe ser un valor numérico')
        } else if (errorDetails.path[0] === 'nombre_programa') {
          toast.error('El nombre del programa debe ser más específico')
        }
      } else {
        // Si no hay errores de validación, procede con la creación de la ficha
        const response = await createFicha(dataValue)
        const res = response.data.message
        toast.success('¡Genial!', {
          description: res
        })
        reloadFetchState()
        setTimeout(() => {
          cerrarModal()
        }, 1000)
      }
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error('¡Opss!', {
        description: message
      })
    }
  }

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  useEffect(() => {
    getCoordi()
  }, [])

  // obtener coordinadores
  const getCoordi = async () => {
    const response = await getCoordination()
    const res = response.data.result
    setCoordination(res)
  }

  return (
    <>
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center">
        <Alerts contenido={'Los datos deben coincidir con los registrados en Sofía Plus'} />
        <Toaster position="top-right" closeButton richColors />
        <section className={'bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          <header className="flex justify-center ">
            <h3 className="text-2xl font-semibold">
              <i className="fi fi-rr-users-medical text-green-500 px-3"></i>Agregar Fichas
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          <section className="mt-[2rem]">
            <section className="relative grid grid-cols-2 justify-center gap-8">
              <section className="modalInput ">
                <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                  <Input isRequired size="md" type="text" label="Número de ficha" labelPlacement={'outside'} variant={'flat'} maxLength={12} min={6} value={numeroFicha} onChange={(e) => setNumeroFicha(e.target.value)} />
                </div>
              </section>
              <section className="modalInput">
                <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                  <Input isRequired size="md" type="text" label="Nombre del programa" labelPlacement={'outside'} variant={'flat'} minLength={2} value={nombrePrograma} onChange={(e) => setNombrePrograma(e.target.value)} />
                </div>
              </section>
              <section>
                <select className=" bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" value={jornada} onChange={(e) => setJornada(e.target.value)}>
                  <option value="">Jornada*</option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Fines de semana">Fines de semana</option>
                </select>
              </section>
              <section>
                <select className="bg-default-100  px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" required onChange={handleEtapaChange} value={etapaPrograma}>
                  <option value="">Etapa*</option>
                  <option value="Lectiva">Lectiva</option>
                  <option value="Productiva">Productiva</option>
                </select>
              </section>
              <section>
                <select className="bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" required disabled={!isTrimestreEnabled} value={numeroTrimestre} onChange={(e) => setNumeroTrimestre(e.target.value)}>
                  <option value="">Trimestre lectivo</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </section>
              <select className="bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" required value={idModalidad} onChange={(e) => setIdmodalidad(e.target.value)}>
                <option value="">Modalidad</option>
                <option value="1">Presencial</option>
                <option value="2">Virtual</option>
                <option value="3">Media técnica</option>
                <option value="4">A distancia</option>
              </select>
            </section>
            <select className="bg-default-100 mt-7 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" onChange={(e) => setCoordinadores(e.target.value)}>
              <option value="">Coordinador*</option>
              {coordination.map((item) => (
                <option key={item.id_usuario} value={item.id_usuario}>
                  {item.nombres + ' ' + item.apellidos}
                </option>
              ))}
            </select>
            <section className="relative grid place-items-center mt-[1rem]">
              <Button variant="shadow" color="primary" id="iconSave" onClick={sendDataFichas}>
                <p className="tracking-wide text-15px">Guardar</p>
                <i className="fi fi-br-check text-[15px]" />
              </Button>
            </section>
          </section>
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
