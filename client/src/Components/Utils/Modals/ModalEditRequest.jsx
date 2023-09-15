import { useState, useMemo, useEffect } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Textarea } from '@nextui-org/react'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT
import { getRequestById } from '../../../api/httpRequest'

export const ModalEditRequest = ({ cerrarModal, requestID }) => {
  /* estado para almacenar los datos de la solicitud */
  const [requestData, setRequestData] = useState([])

  // Dropdown detalles de solicitud
  const [selectedKeys, setSelectedKeys] = useState(new Set(['Estado']))
  const selectedValueDetails = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys])

  const getStatusColorClass = (status) => {
    const statusColorMap = {
      Aprobado: 'bg-green-200 text-success rounded-2xl', // Clase CSS para aprobado
      Rechazado: 'bg-red-200 text-danger rounded-2xl' // Clase CSS para rechazado
    }
    return statusColorMap[status] || 'text-black' // Clase CSS por defecto (negro) si el estado no está en el mapa
  }

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  // Obtener los elementos que se deben mostrar según el rol
  const getElementsByRole = () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    let rolToken = information.id_rol

    // Mapear los ID de rol a nombres de rol
    if (rolToken === 1) rolToken = 'Coordinador'
    if (rolToken === 2) rolToken = 'Instructor'
    if (rolToken === 3) rolToken = 'Administrador'

    return {
      adminCoordi: rolToken === 'Administrador' || rolToken === 'Coordinador',
      administration: rolToken === 'Administrador',
      coordination: rolToken === 'Coordinador',
      instructor: rolToken === 'Instructor'
    }
  }

  // Obtener los elementos que se deben mostrar según el rol
  const elements = getElementsByRole()

  useEffect(() => {
    getIdRequest(requestID)
  }, [])

  const getIdRequest = async (requestID) => {
    try {
      const response = await getRequestById(requestID)
      const res = response.data.result
      setRequestData(res)
      setSelectedKeys(new Set([res[0]?.estado]))

      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center ">
        <section className={'bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl">
              <i className="fi fi-rr-refresh text-green-500 px-3" />
              {elements.administration ? 'Editar información' : 'Información de la solicitud'}
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          <section className="mt-[1.5rem] w-[30rem]">
            <section className="place-items-center gap-4 flex justify-between">
              {elements.administration ? (
                <Dropdown disabled={elements.instructor}>
                  <DropdownTrigger>
                    <Button variant="flat" className={`capitalize ${selectedValueDetails === 'En proceso' ? 'bg-yellow-200 text-warning rounded-2xl' : getStatusColorClass(selectedValueDetails)}`}>
                      {selectedValueDetails}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                    <DropdownItem key="Aprobado">Aprobado</DropdownItem>
                    <DropdownItem key="En proceso">En proceso</DropdownItem>
                    <DropdownItem key="Rechazado">Rechazado</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button className={` ${requestData[0]?.estado === 'Aprobado' ? 'bg-green-200 text-success ' : requestData[0]?.estado === 'En proceso' ? 'bg-yellow-200 text-warning' : 'bg-red-200 text-danger'} rounded-2xl `}>{requestData[0]?.estado}</Button>
              )}

              <section>
                <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
              </section>
            </section>
            {elements.adminCoordi && (
              <section className="grid mt-[1rem]">
                <strong>Descripcion actual del estado</strong>
                <p>{requestData[0] ? requestData[0].descripcion_estado_solicitud : 'Verificando información para la aprobación de la solicitud'}</p>
              </section>
            )}
            <section className="w-full grid grid-cols-12  gap-4 py-4">
              <Textarea variant={'faded'} label={elements.administration ? 'Ingresar descripción' : 'Descripción del estado'} labelPlacement="outside" placeholder={elements.administration ? 'Ingresar la nueva descripción del estado' : requestData[0] ? requestData[0].descripcion_estado_solicitud : ''} className="col-span-12 md:col-span-20 mb-6 md:mb-0" disabled={elements.instructor} />
            </section>
            {elements.administration && (
              <section className="flex gap-4 relative py-[5px]">
                <section className="">
                  <Button color="primary">
                    <i className="fi fi-br-check"></i>
                    Guardar
                  </Button>
                </section>
                <section className=" ">
                  <Button color="warning" variant="bordered">
                    <i className="fi fi-rr-pencil"></i>
                    Editar
                  </Button>
                </section>
              </section>
            )}
          </section>
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
