import { Select, SelectItem, Button, Input } from '@nextui-org/react'
import { Toaster, toast } from 'sonner'
import { fileReportApprentices, fileReportByGroup, fileReportRequest } from '../../../api/httpRequest'
import { CreateFileReport, CreateFileReportApprenticesByGroups, CreateFileReportRequest } from '../../ExcelFile/CreateExcelFile'
import { useEffect, useState } from 'react'

export const ModalGenerateReport = ({ cerrarModal }) => {
  const [selectedReport, setSelectedReport] = useState('')
  const [apprenticeByGroup, setApprenticeBygroup] = useState(false)
  const [groupNumber, setGroupNumber] = useState('')

  // Cerrar modal
  const closeModal = () => {
    cerrarModal()
  }

  const generateReportExcelFile = async () => {
    if (selectedReport === 'Aprendices seleccionados a comité') {
      try {
        const response = await fileReportApprentices()
        const reportApprentices = response.data.result

        CreateFileReport(reportApprentices)
      } catch (error) {
        const message = error?.response?.data?.message
        toast.error('¡Opss!', {
          description: message || 'Ha ocurrido un error inesperado'
        })
      }
    } else if (selectedReport === 'Solicitudes rechazadas y aceptadas') {
      try {
        const response = await fileReportRequest()
        const reportRequest = response.data.result

        CreateFileReportRequest(reportRequest)
      } catch (error) {
        const message = error?.response?.data?.message
        toast.error('¡Opss!', {
          description: message || 'Ha ocurrido un error inesperado'
        })
      }
    } else {
      try {
        const response = await fileReportByGroup(groupNumber)
        const reportApprenticeByGroup = response.data.result

        CreateFileReportApprenticesByGroups(reportApprenticeByGroup)
      } catch (error) {
        const message = error?.response?.data?.message
        toast.error('¡Opss!', {
          description: message
        })
      }
    }
  }

  const changeButton = () => {
    setApprenticeBygroup(!apprenticeByGroup)
  }

  return (
    <>
      <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center ">
        <Toaster position="top-right" closeButton richColors />
        <section className={'w-[30rem] bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl">Generar reportes</h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          <section className="mt-[1.5rem] grid gap-5">
            <Select
              label="¿Qué reporte quieres descargar?"
              placeholder="Selecciona un tipo de reporte."
              className="w-full"
              value={selectedReport}
              onChange={(e) => {
                setSelectedReport(e.target.value)
              }}
            >
              <SelectItem key={'Aprendices seleccionados a comité'} value={'Aprendices'}>
                Aprendices seleccionados a comité
              </SelectItem>
              <SelectItem key={'Solicitudes rechazadas y aceptadas'} value={'Solicitudes'}>
                Solicitudes rechazadas y aceptadas
              </SelectItem>
              <SelectItem key={'Aprendices por número de ficha'} value={'AprendicesPorFicha'} onClick={changeButton}>
                Aprendices por número de ficha
              </SelectItem>
            </Select>
            {apprenticeByGroup ? <Input type="text" label={'Digite el número de la ficha'} onChange={(e) => setGroupNumber(e.target.value)} /> : null}

            <Button color="success" variant="bordered" onClick={generateReportExcelFile} isDisabled={!selectedReport}>
              Descargar reporte
            </Button>
          </section>
        </section>
        <section className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]" onClick={closeModal} />
      </main>
    </>
  )
}
