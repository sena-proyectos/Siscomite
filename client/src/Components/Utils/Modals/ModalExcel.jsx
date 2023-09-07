import React, { useEffect } from 'react'
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export const ModalExcel = () => {
  // El hook useDisclosure se utiliza para controlar la apertura y cierre del modal.
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Estado para controlar el valor de la barra de progreso circular.
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    // Un efecto que incrementa el valor de la barra de progreso cada 500 ms.
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 500)

    // Limpia el intervalo cuando el componente se desmonta.
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button onPress={onOpen}>Open Modal</Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* Encabezado del modal */}
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>

              {/* Cuerpo del modal */}
              <ModalBody>
                {/* Barra de progreso circular */}
                <CircularProgress aria-label="Loading..." size="lg" value={value} color="warning" showValueLabel={true} />
                <p>Leyendo archivo</p>
              </ModalBody>

              {/* Pie del modal con botones */}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
