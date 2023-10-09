import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import './Alerts.css'

export const Alerts = ({ cerrarAlert, contenido, recordatorio, descargarExcel }) => {
  // Estado para controlar si la alerta debe mostrarse
  const [showAlert, setShowAlert] = useState(true)
  // Agregamos un estado para controlar si ha pasado más de 3 segundos
  const [alertTime, setAlertTime] = useState(false)
  // Estado para el contador regresivo
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    // Utilizamos setTimeout para cerrar la alerta después de 3 segundos
    const timer = setTimeout(() => {
      setAlertTime(true)
    }, 3000)

    // Utilizamos setInterval para actualizar el contador regresivo
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1
        }
        return prevCountdown
      })
    }, 1000)

    // Limpia los temporizadores si el componente se desmonta antes de que se cierre la alerta
    return () => {
      clearTimeout(timer)
      clearInterval(countdownTimer)
    }
  }, [])

  // Cerrar alerta
  const alertClose = () => {
    if (alertTime) {
      setShowAlert(false)
      cerrarAlert()
    }
  }

  // Agregamos un manejador de eventos para cancelar el cierre al hacer clic en la alerta
  const AlertClick = () => {
    if (alertTime) {
      setShowAlert(false)
      cerrarAlert()
    }
  }

  return (
    <>
      {showAlert && (
        <main className="h-screen w-screen absolute inset-0 z-20 flex justify-center" onClick={AlertClick}>
          <section className="h-[11rem] w-[36rem] p-4 bg-white rounded-xl shadow-lg z-20 mt-5 border-4 border-yellow-500 cardAlert">
            <header className="flex gap-4 justify-between">
              <section className="w-full justify-center flex text-[24px] font-bold">
                <i className="icon fi fi-sr-triangle-warning text-warning pr-4" />
                <h2>Importante</h2>
              </section>
              <i className={`fi fi-br-cross text-xs cursor-pointer`} onClick={alertClose} />
            </header>
            <section className="h-[60%] mt-[1rem] grid place-items-center">
              <p className="text-[16px]">{contenido}</p>
              <p className="text-[16px]">{recordatorio}</p>
              {descargarExcel && (
                <Button color="success" size="sm" variant="flat" className="">
                  <a href="Reporte de Aprendices.xlsx" download={'Reporte de Aprendices.xlsx'}>
                    Descargar excel <i className="fi fi-rr-download"></i>
                  </a>
                </Button>
              )}
            </section>
            <p className="text-sm text-default-400 ">Esta alerta se podrá cerrar en: {countdown} segundos</p>
          </section>
          <section className="inset-0 bg-[#00000068] -z-10 fixed flex items-center justify-center " onClick={alertClose} />
        </main>
      )}
    </>
  )
}
