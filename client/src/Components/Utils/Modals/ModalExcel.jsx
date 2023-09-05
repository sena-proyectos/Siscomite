import React, { useEffect } from 'react'
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export const ModalExcel = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 500)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <CircularProgress aria-label="Loading..." size="lg" value={value} color="warning" showValueLabel={true} />
                <p>Leyendo archivo</p>
              </ModalBody>
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
