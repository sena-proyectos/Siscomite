import { useEffect } from 'react'

export const Text = () => {
  useEffect(() => {
    const notification = document.createElement('div')
    notification.className = 'h-[10rem]  fixed top-[10rem] left-[35rem] m-auto p-4 bg-red-500 text-white rounded shadow-lg'
    notification.textContent = '¡Bienvenido a nuestra página! Gracias por visitarnos.'
    document.body.appendChild(notification)

    // Elimina la notificación después de un tiempo (opcional)
    setTimeout(() => {
      notification.remove()
    }, 5000) // Elimina la notificación después de 5 segundos
  }, [])

  return (
    <>
      <main className="inset-0 bg-[#0000006a] -z-10 fixed flex items-center justify-center backdrop-blur-[3px]"></main>
    </>
  )
}
