/* Importaciones de modulos y componentes */
import './Register.css'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { register } from '../../api/httpRequest'
import { Footer } from '../Footer/Footer'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from '@nextui-org/react'
import { Toaster, toast } from 'sonner'
import { validationRegister } from '../../Validations/validations'

export const Register = () => {
  /* Estados para capturar los valores de los campos */
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [emailSena, setEmailSena] = useState('')
  const [numeroCelular, setNumeroCelular] = useState('')
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('')

  // Limpiar el formulario al enviarlo
  const cleanInput = useRef(null)

  /* mapeo de los valores segun la base de datos */
  const documentoOptions = {
    CC: '1',
    TI: '2',
    CE: '3',
    PEP: '4'
  }

  /* Enviar datos capturados al servidor  */
  const sendData = async (e) => {
    e.preventDefault()
    const dataValue = {
      nombres: nombres.toUpperCase(),
      apellidos: apellidos.toUpperCase(),
      email_sena: emailSena,
      numero_celular: numeroCelular,
      id_documento: documentoOptions[selectedTipoDocumento],
      numero_documento: numeroDocumento,
      contrasena: contrasena
    }

    try {
      // Validar los datos antes de enviarlos
      const { error } = validationRegister.validate(dataValue, { stripUnknown: true })
      if (error) {
        const errorDetails = error.details[0] // Obtén el primer detalle de error
        const errorMessage = errorDetails.message

        if (errorDetails.path[0] === 'numero_celular') {
          toast.error('El número de celular no es válido, verifíquelo')
        } else if (errorDetails.path[0] === 'numero_documento') {
          toast.error('El número de documento no es válido')
        } else if (errorDetails.path[0] === 'contrasena') {
          toast.error('La contraseña no es válida. Debe contener mayúsculas, números y carácteres especiales')
        } else {
          toast.error(`Error de validación: ${errorMessage}`)
        }
      } else {
        // Si no hay errores de validación, procede con la creación de el usurio
        const res = await register(dataValue)
        const message = res.data.message
        toast.success('¡Genial!', {
          description: message
        })

      }
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error(message, {
        description: message
      })
    }
  }
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['Tipo documento']))
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <main className="h-screen">
      <Toaster position="top-right" closeButton richColors />
      <section className="absolute top-11 left-11" style={{ animation: 'show 0.8s ease-in-out' }}>
        <img src="/image/logoSena.webp" alt="Sena" className="w-[4rem]" />
      </section>
      <section className="flex items-center justify-center w-full h-screen" style={{ animation: 'show 0.8s ease-in-out' }}>
        <form className="relative grid p-4 rounded-xl bg-white shadow-md text-center place-items-center " onSubmit={sendData}>
          <h2 className="font-semibold text-[1.5rem]">Crear una cuenta</h2>
          <section className="relative w-[90%] top-[1.5rem] grid gap-8  ">
            <section className="w-full flex justify-between gap-2">
              <div className="flex flex-wrap items-end w-full gap-4 mb-6 p md:flex-nowrap md:mb-0">
                <Input type="text" isRequired label="Nombre" labelPlacement={'outside'} autoComplete="off" value={nombres} onChange={(e) => setNombres(e.target.value)} />
              </div>

              <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                <Input type="text" isRequired label="Apellido" labelPlacement={'outside'} autoComplete="off" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
              </div>
            </section>

            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input type="email" isRequired label="Correo institucional" labelPlacement={'outside'} autoComplete="off" value={emailSena} onChange={(e) => setEmailSena(e.target.value)} />
            </div>
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input type="text" label="Teléfono" labelPlacement={'outside'} autoComplete="off" value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} maxLength={15} />
            </div>

            <section className="w-full flex justify-between gap-2 ">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-full gap-4 capitalize ">
                    {selectedTipoDocumento || 'Tipo documento *'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection actions"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) => {
                    setSelectedKeys(keys)
                    setSelectedTipoDocumento(Array.from(keys)[0])
                  }}
                >
                  <DropdownItem key="CC">CC</DropdownItem>
                  <DropdownItem key="TI">TI</DropdownItem>
                  <DropdownItem key="CE">CE</DropdownItem>
                  <DropdownItem key="PEP">PEP</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                <Input type="text" isRequired label="Documento" labelPlacement={'outside'} autoComplete="off" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
              </div>
            </section>

            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input
                isRequired
                label="Contraseña"
                labelPlacement={'outside'}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <i className="fi fi-rs-crossed-eye"></i> : <i className="fi fi-rr-eye"></i>}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-full"
                autoComplete="off"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>

            <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3">Registrate</button>
            <p className="text-sm top-[-1rem] relative">
              ¿Ya estas registrado?{' '}
              <Link className="text-sm text-[#587fff]" to={'/'}>
                Iniciar sesión
              </Link>
            </p>
          </section>
        </form>
      </section>
      <Footer />
    </main>
  )
}
