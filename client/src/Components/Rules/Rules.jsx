// Importaciones necesarias
import { ViewPdf } from '../ViewPDF/ViewPDF' // Importar el componente ViewPdf
import React, { useState } from 'react' // Importar React y useState
import { Sliderbar } from '../Sliderbar/Sliderbar' // Importar el componente Sliderbar
import { Footer } from '../Footer/Footer' // Importar el componente Footer
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react' // Importar componentes de Next UI

import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

// Componente Rules
const Rules = () => {
  // Estados para controlar la visibilidad de diferentes elementos
  const [inputVisibleCap, setInputVisibleCap] = useState(false)
  const [inputVisibleArt, setInputVisibleArt] = useState(false)
  const [inputVisibleNumeral, setInputVisibleNumeral] = useState(false)
  const [inputVisibleParagrafos, setInputVisibleParagrafos] = useState(false)

  // Modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Modal
  // Drop capítulo
  const [selectedKeysCaps, setSelectedKeysCaps] = React.useState(new Set(['Seleccionar capítulos']))
  const selectedValueCaps = React.useMemo(() => Array.from(selectedKeysCaps).join(', ').replaceAll('_', ' '), [selectedKeysCaps])

  const [changeButtonCap, setChangeButtonCap] = useState(false)

  const CapAddButtonClick = () => {
    setInputVisibleCap(!inputVisibleCap)
    setChangeButtonCap(!changeButtonCap)
  }
  // Drop artículo
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['Seleccionar artículos']))
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys])

  const [changeButtonArt, setChangeButtonArt] = useState(false)

  const ArtAddButtonClick = () => {
    setInputVisibleArt(!inputVisibleArt)
    setChangeButtonArt(!changeButtonArt)
  }
  // Drop parágrafo
  const [selectedKeysParagrafos, setSelectedKeysParagrafos] = React.useState(new Set(['Seleccionar parágrafos']))
  const selectedValueParagrafos = React.useMemo(() => Array.from(selectedKeysParagrafos).join(', ').replaceAll('_', ' '), [selectedKeysParagrafos])

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

  // Función para guardar cambios (simulada con un timeout)
  const handleSave = () => {
    setIsLoading(true)
    // Simular un proceso de guardado
    setTimeout(() => {
      setIsLoading(false)
      setIsEditModalOpen(false)
    }, 2000)
  }

  return (
    <>
      <Modal isOpen={isEditModalOpen} onOpenChange={handleCloseEditModal} size="2xl" className=" border-t-[4px] border-[#2e323e] backdrop-blur-[3px] ">
        <ModalContent>
          <ModalHeader className="flex items-center flex-col gap-1">
            <p className="text-2xl">
              <i className="fi fi-rr-edit text-warning pr-[.5rem]"></i>
              Editar Reglamento
            </p>
          </ModalHeader>
          <ModalBody>
            <section className=" grid grid-cols-2 ">
              <section className="relative p-[1rem] ">
                <section className="pr-[1rem] flex">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" color="primary" className="w-full">
                        {selectedValueCaps}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeysCaps={selectedKeysCaps} onSelectionChange={setSelectedKeysCaps}>
                      <DropdownItem key="Capítulo 1">Capítulo 1</DropdownItem>
                      <DropdownItem key="Capítulo  2">Capítulo 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <section className="pl-3">
                    <Button isIconOnly color="primary" onClick={CapAddButtonClick}>
                      {changeButtonCap ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleCap ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar capítulo" color="primary" variant="faded" />
                  <Textarea name="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                </section>
              </section>

              <section className="relative p-[1rem]">
                <section className="pr-[1rem] flex">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" color="primary" className="w-full">
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                      <DropdownItem key="Artículo 1">Artículo 1</DropdownItem>
                      <DropdownItem key="Artículo 2">Artículo 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={ArtAddButtonClick}>
                      {changeButtonArt ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleArt ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar artículo" color="primary" variant="faded" />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                </section>
              </section>

              <section className="relative p-[1rem] ">
                <section className=" flex pr-[.3rem]">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" color="primary" className="w-full ">
                        {selectedValueParagrafos}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeysParagrafos={selectedKeysParagrafos} onSelectionChange={setSelectedKeysParagrafos}>
                      <DropdownItem key="Parágrafo 1">Parágrafo 1</DropdownItem>
                      <DropdownItem key="Parágrafo 2">Parágrafo 2</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={ParagrafosAddButtonClick}>
                      {changeButtonParagrafos ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleParagrafos ? '' : 'hidden'}`}>
                  <Input type="text" size="sm" label="Agregar paragrafo" color="primary" variant="faded" />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                </section>
              </section>

              <section className="relative  p-[1rem]">
                <section className="pr-[1rem] flex">
                  <Input type="number" labelPlacement="outside" label="Seleccionar numeral" variant="faded" />
                  <section className="px-3">
                    <Button isIconOnly color="primary" onClick={NumeralAddButtonClick}>
                      {changeButtonNumeral ? '-' : '+'}
                    </Button>
                  </section>
                </section>
                <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleNumeral ? '' : 'hidden'}`}>
                  <Input type="number" size="sm" label="Agregar numeral" color="primary" variant="faded" />
                  <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                </section>
              </section>
            </section>

            <ModalFooter>
              <Button color="success" variant="flat" onClick={handleSave}>
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
            <section className="grid grid-rows-2 max-[1030px]:flex max-[1030px]:grid-cols-1 max-[1030px]:grid-flow-col  max-[1030px]:w-full max-[1030px]:px-[6rem] max-[1030px]:py-[1rem] ">
              <section className="w-full flex items-start justify-end p-[1rem]">
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
