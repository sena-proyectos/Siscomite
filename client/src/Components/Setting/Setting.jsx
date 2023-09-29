import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Footer } from '../Footer/Footer'
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from '@nextui-org/react'

import Cookie from 'js-cookie' // Importar el módulo Cookie para trabajar con cookies
import jwt from 'jwt-decode' // Importar el módulo jwt-decode para decodificar tokens JWT
import { updateUser, usersById, stateUser } from '../../api/httpRequest'

import { Toaster, toast } from 'sonner'
import sw from 'sweetalert2'

const Setting = () => {
  // Estado para ver la informacion del usuario
  const [information, setInformation] = useState([])

  const [emailSena, setEmailSena] = useState(null)
  const [emailPersonal, setEmailPersonal] = useState(null)
  const [numeroCelular, setNumeroCelular] = useState(null)
  const [telefonoFijo, setTelefonoFijo] = useState(null)
  const [contrasena, setContrasena] = useState(null)
  const [nuevaContrasena, setNuevaContrasena] = useState(null)

  const navigate = useNavigate()

  // Campo para cambiar si la contraseña es visible o no
  // Vieja contraseña
  const [showOldPassword, setShowOldPassword] = useState(false)

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword)
  }
  // Nueva contraseña
  const [showNewPassword, setShowNewPassword] = React.useState(false)

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }

  // Cambiar el estado el botón
  const handleClick = () => {
    try {
      sw.fire({
        title: '¿Estás seguro que quieres deshabilitar tu cuenta?',
        text: 'Estos cambios serán irreversibles',
        showDenyButton: true,
        confirmButtonText: 'Deshabilitar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await stateUser(information.id_usuario)
          const message = response.data.message
          toast.success('Genial!!', {
            description: message
          })
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      })
    } catch (error) {}
  }

  useEffect(() => {
    InformationUser()
  }, [])

  const InformationUser = async () => {
    const token = Cookie.get('token') // Obtener el token almacenado en las cookies
    const information = jwt(token) // Decodificar el token JWT
    const rolUser = information.id_usuario
    try {
      const response = await usersById(rolUser)
      const [information] = response.data.result
      setInformation(information)
    } catch (error) {}
  }

  const updateInformation = async () => {
    const dataValue = {
      email_sena: emailSena,
      email_personal: emailPersonal,
      numero_celular: numeroCelular,
      telefono_fijo: telefonoFijo,
      contrasena,
      nuevaContrasena
    }

    const rolUser = information.id_usuario

    try {
      const response = await updateUser(rolUser, dataValue)
      const message = response.data.message
      toast.success('Genial!!', {
        description: message
      })
    } catch (error) {
      const message = error.response.data.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  return (
    <main className="h-screen flex">
      <Toaster position="top-right" closeButton richColors />
      <Sliderbar />
      <section className="w-full  overflow-auto">
        <section className="h-screen grid grid-cols-2 gap-4 place-items-center">
          <form className="p-[1rem] w-full">
            <Card className=" h-full overflow-auto">
              <CardHeader className="flex justify-between items-start  pb-0">
                <section className="flex gap-3">
                  <i className="fi fi-rr-settings text-[2.5rem]" />
                  <samp className="flex flex-col">
                    <p className="text-md">{information.nombres + ' ' + information.apellidos}</p>
                    <p className="text-small text-default-500">{information.email_sena}</p>
                  </samp>
                </section>
                <Button onClick={handleClick} className={`px-4 py-2 bg-red-200 text-red-700 `}>
                  Deshabilitar cuenta
                </Button>
              </CardHeader>
              <Divider className="bg-blue-500" />
              <CardBody>
                <h3 className="font-bold">Seguridad de cuenta</h3>
                <Input label="Email institucional" type="email" variant="underlined" placeholder={information.email_sena || 'No disponible'} onChange={(e) => setEmailSena(e.target.value)} className="w-[18rem]" />
                <Input label="Email personal" type="email" variant="underlined" placeholder={information.email_personal || 'No disponible'} onChange={(e) => setEmailPersonal(e.target.value)} className="w-[18rem]" />
                <Input label="Número de contacto" type="text" variant="underlined" placeholder={information.numero_celular || 'No disponible'} onChange={(e) => setNumeroCelular(e.target.value)} className="w-[18rem]" />
                <Input label="Número alterno" type="text" variant="underlined" placeholder={information.telefono_fijo || 'No disponible'} onChange={(e) => setTelefonoFijo(e.target.value)} className="w-[18rem]" />
              </CardBody>
              <Divider className="bg-blue-500" />
              <CardFooter className="block">
                <h3 className="font-bold">Cambiar contraseña</h3>
                <Input
                  label="Antigua contraseña"
                  variant="underlined"
                  placeholder="Ingresa tu antigua contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleShowOldPassword}>
                      {showOldPassword ? <i className="fi fi-rr-eye-crossed" /> : <i className="fi fi-rr-eye" />}
                    </button>
                  }
                  type={showOldPassword ? 'text' : 'password'}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="w-[18rem]"
                />

                <Input
                  label="Nueva contraseña"
                  variant="underlined"
                  placeholder="Ingresa tu nueva contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleShowNewPassword}>
                      {showNewPassword ? <i className="fi fi-rr-eye-crossed" /> : <i className="fi fi-rr-eye" />}
                    </button>
                  }
                  type={showNewPassword ? 'text' : 'password'}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  className="w-[18rem]"
                />
                <section className="mt-[1rem]">
                  <Button color="primary" variant="flat" className=" w-[10rem]" onClick={updateInformation}>
                    Guardar cambios <i className="fi fi-br-check" />
                  </Button>
                </section>
              </CardFooter>
            </Card>
          </form>
          
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Setting }
