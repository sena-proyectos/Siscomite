import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Notify } from '../Utils/NotifyBar/NotifyBar' // Importar el componente Notify para notificaciones
import { Button, Input } from '@nextui-org/react'

const Procedures = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  // Estado para controlar la apertura de la barra de notificaciones
  const [notifyOpen, setNotifyOpen] = useState(false)

  // Función para alternar la visibilidad de la barra de notificaciones
  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }
 

  return (
    <main className="flex h-secreen">
      <Sliderbar />
      <section className="w-full overflow-auto">
        <header className="w-full flex right-0 relative ">
          <section className=" pb-[.4rem]   cursor-pointer ">
            {notifyOpen ? (
              <></>
            ) : (
              <>
                <section className="bg-blue-200 rounded-full w-[2rem] h-[2rem] grid place-items-center" onClick={toggleNotify} aria-label="Notificaciones">
                  <i className="fi fi-ss-bell text-blue-400 p-[.3rem]" />
                </section>
              </>
            )}
          </section>
        </header>
        <section className="h-[85vh] grid grid-cols-2 gap-4 p-[3rem] bg-red-">
          <section className="h-full p-20 grid place-items-center">
            <label htmlFor="upload" className="w-full flex flex-col items-center justify-center gap-2 p-10 cursor-pointer bg-white rounded-md border border-blue-600 shadow-md">
              <i className="fi fi-rr-add-document text-blue-600 text-3xl" />
              <span className="text-gray-600 font-se">{file ? `Archivo seleccionado: ${file.name}` : 'Subir archivo'}</span>
            </label>
            <input id="upload" type="file" className="hidden" onChange={handleFileChange} />
          </section>
          <section className="w-full flex flex-col justify-center gap-5  p-20">
            <Input isRequired type="email" label="Agregar email" labelPlacement="outside" className="w-full " />
            <Button color="primary" variant="shadow">
              Enviar
            </Button>
          </section>
          <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Procedures }
