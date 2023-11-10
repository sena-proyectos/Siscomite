// Importaciones necesarias
import { ViewPdf } from '../ViewPDF/ViewPDF' // Importar el componente ViewPdf
import React, { useState } from 'react' // Importar React y useState
import { Sliderbar } from '../Sliderbar/Sliderbar' // Importar el componente Sliderbar
import { Footer } from '../Footer/Footer' // Importar el componente Footer
import { Textarea, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react' // Importar componentes de Next UI

import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'
import { Toaster, toast } from 'sonner'
import { postRules } from '../../api/httpRequest'

// Componente Rules
const Rules = () => {
  // Estados para controlar la visibilidad de diferentes elementos
  const [inputVisibleCap, setInputVisibleCap] = useState(false)
  const [inputVisibleArt, setInputVisibleArt] = useState(false)
  const [inputVisibleNumeral, setInputVisibleNumeral] = useState(false)
  const [inputVisibleParagrafos, setInputVisibleParagrafos] = useState(false)

  /* valor del capitulo */
  const [titulo, setTitulo] = useState('')
  const [descripcionTitulo, setDescripcionTitulo] = useState('')

  /* Valor del articulo */
  const [numeroArticulo, setNumeroArticulo] = useState('')
  const [descripcionArticulo, setDescripcionArticulo] = useState('')

  /* valor del paragrafo */
  const [tituloParagrafo, setTituloParagrafo] = useState('')
  const [descripcionParagrafo, setDescripcionParagrafo] = useState('')

  /* valor del numeral */
  const [numeroNumeral, setNumeroNumeral] = useState('')
  const [descripcionNumeral, setDescripcionNumeral] = useState('')

  // Modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Modal

  const [changeButtonCap, setChangeButtonCap] = useState(false)

  const CapAddButtonClick = () => {
    setInputVisibleCap(!inputVisibleCap)
    setChangeButtonCap(!changeButtonCap)
  }

  const [changeButtonArt, setChangeButtonArt] = useState(false)

  const ArtAddButtonClick = () => {
    setInputVisibleArt(!inputVisibleArt)
    setChangeButtonArt(!changeButtonArt)
  }

  const [changeButtonParagrafos, setChangeButtonParagrafos] = useState(false)

  const ParagrafosAddButtonClick = () => {
    setInputVisibleParagrafos(!inputVisibleParagrafos)
    setChangeButtonParagrafos(!changeButtonParagrafos)
  }

  // Input numeral
  const [changeButtonNumeral, setChangeButtonNumeral] = useState(false)

  const NumeralAddButtonClick = () => {
    setInputVisibleNumeral(!inputVisibleNumeral)
    setChangeButtonNumeral(!changeButtonNumeral)
  }

  // Función para abrir el modal de edición
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const addRule = async () => {
    const dataValue = {
      titulo,
      descripcion_capitulo: descripcionTitulo,
      numero_articulo: numeroArticulo,
      descripcion_articulo: descripcionArticulo,
      titulo_paragrafo: tituloParagrafo,
      descripcion_paragrafo: descripcionParagrafo,
      numero_numeral: numeroNumeral,
      descripcion_numeral: descripcionNumeral
    }
    
    try {
      const response = await postRules(dataValue)
      const message = response.data.message
      toast.success('¡Genial!', {
        description: message
      })
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error('¡Opss!', {
        description: message
      })
    }
  }

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <Modal isOpen={isEditModalOpen} onOpenChange={handleCloseEditModal} size="2xl" className=" border-t-[4px] border-[#2e323e] backdrop-blur-[3px] ">
        <ModalContent>
          <ModalHeader className="flex items-center flex-col gap-1">
            <p className="text-2xl">
              <i className="fi fi-rr-edit text-warning pr-[.5rem]"></i>
              Editar Reglamento
            </p>
          </ModalHeader>
          <ModalBody>
            <form className=" grid grid-cols-2 " onSubmit={addRule}>
              <section className="relative p-[1rem] ">
                <section className="pr-[1rem] flex">
                  <Button variant="bordered" color="primary" className="w-full" onClick={CapAddButtonClick}>
                    Agregar capitulos
                  </Button>
                  <section className="pl-3">
                    <Button isIconOnly color="primary" onClick={CapAddButtonClick}>
                      {changeButtonCap ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleCap ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar capítulo" color="primary" variant="faded" onChange={(e) => setTitulo(e.target.value)} />
                  <Textarea name="" cols="30" rows="10" placeholder="Ingresar descripción" onChange={(e) => setDescripcionTitulo(e.target.value)}></Textarea>
                </section>
              </section>

              <section className="relative p-[1rem]">
                <section className="pr-[1rem] flex">
                  <Button variant="bordered" color="primary" className="w-full" onClick={ArtAddButtonClick}>
                    Agregar articulo
                  </Button>
                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={ArtAddButtonClick}>
                      {changeButtonArt ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleArt ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar artículo" color="primary" variant="faded" onChange={(e) => setNumeroArticulo(e.target.value)} />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción" onChange={(e) => setDescripcionArticulo(e.target.value)}></Textarea>
                </section>
              </section>

              <section className="relative p-[1rem] ">
                <section className=" flex pr-[.3rem]">
                  <Button variant="bordered" color="primary" className="w-full" onClick={ParagrafosAddButtonClick}>
                    Agregar paragrafo
                  </Button>
                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={ParagrafosAddButtonClick}>
                      {changeButtonParagrafos ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleParagrafos ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar paragrafo" color="primary" variant="faded" onChange={(e) => setTituloParagrafo(e.target.value)} />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción" onChange={(e) => setDescripcionParagrafo(e.target.value)}></Textarea>
                </section>
              </section>

              <section className="relative  p-[1rem]">
                <section className="pr-[1rem] flex">
                  <Button variant="bordered" color="primary" className="w-full" onClick={NumeralAddButtonClick}>
                    Agregar numerales
                  </Button>

                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={NumeralAddButtonClick}>
                      {changeButtonNumeral ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleNumeral ? '' : 'hidden'}`}>
                  <Input type="number" size="sm" label="Agregar numeral" color="primary" variant="faded" onChange={(e) => setNumeroNumeral(e.target.value)} />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción" onChange={(e) => setDescripcionNumeral(e.target.value)}></Textarea>
                </section>
              </section>
            </form>

            <ModalFooter>
              <Button color="success" variant="flat" onClick={addRule}>
                <i className="fi fi-br-check"></i>
                Guardar
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full h-screen overflow-auto">
          <section className="grid h-screen grid-cols-3 max-[1030px]:grid-cols-1">
            <section className="grid grid-rows-2 max-[1030px]:flex max-[1030px]:w-full max-[1030px]:px-[6rem] max-[1030px]:py-[1rem] ">
              <section className="w-full flex items-start justify-end p-[1rem] max-[1030px]:justify-center">
                <NotifyBadge />
              </section>
              <section className="flex justify-center">
                <Button size="lg" onClick={handleOpenEditModal} color="primary" variant="shadow">
                  Editar reglamento
                  <i className="fi fi-rr-pencil"></i>
                </Button>
              </section>
            </section>
            <section className="col-span-2 z-0">
              <ViewPdf />
            </section>
          </section>
          <Footer />
        </section>
      </main>

      {/* Modal de carga */}
      <Modal open={isLoading} disableBackdropClick>
        <ModalContent>
          <ModalBody>
            <p>Cargando...</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export { Rules }
