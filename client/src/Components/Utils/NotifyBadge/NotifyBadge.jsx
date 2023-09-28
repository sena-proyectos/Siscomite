import { useEffect, useState } from 'react' // Importa los hooks useEffect y useState de React.
import { userInformationStore } from '../../../store/config' // Importa una función para obtener información del usuario.
import { countMessage, sendEmail } from '../../../api/httpRequest' // Importa funciones para contar mensajes y enviar correos electrónicos.
import { Notify } from '../NotifyBar/NotifyBar' // Importa el componente Notify.
import { notificationStore } from '../../../store/config' // Importa una función para gestionar notificaciones.

import { Badge } from '@nextui-org/react' // Importa el componente Badge de una biblioteca externa.

export const NotifyBadge = () => {
  const [notifyOpen, setNotifyOpen] = useState(false) // Estado para controlar si se muestra el componente de notificación.
  const { userInformation } = userInformationStore() // Obtiene información del usuario actual.

  // Función para cambiar el estado de notifyOpen (mostrar/ocultar notificaciones).
  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }

  const { numCount, setNumCount } = notificationStore() // Obtiene y actualiza el número de notificaciones.
  const [prevNumCount, setPrevNumCount] = useState(numCount) // Almacena el número de notificaciones anterior.

  useEffect(() => {
    // Función asincrónica para contar mensajes y gestionar notificaciones.
    const messageCount = async () => {
      try {
        // Realiza una solicitud para contar los mensajes del usuario.
        const response = await countMessage(userInformation.id_usuario)
        const res = response.data.result[0].num_message // Obtiene el número actual de notificaciones.

        if (prevNumCount !== 0 && res > prevNumCount) {
          sendMail() // Envía un correo electrónico.

          // Muestra una notificación en el sistema operativo si es posible.
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nuevas novedades!!', {
              body: 'Tienes un mensaje nuevo en tu bandeja de entrada de Siscomité.'
            })
          }
        }

        setNumCount(res) // Actualiza el número de notificaciones.
        setPrevNumCount(res) // Actualiza el número de notificaciones anterior.
      } catch (error) {
        // Maneja cualquier error que ocurra.
      }
    }

    const intervalId = setInterval(messageCount, 1000) // Ejecuta la función cada segundo.

    // Limpia el intervalo cuando el componente se desmonta.
    return () => {
      clearInterval(intervalId)
    }
  }, [prevNumCount, setNumCount]) // Dependencias del efecto.

  // Función para enviar un correo electrónico al usuario.
  const sendMail = async () => {
    const dataValue = {
      to: userInformation.email_sena,
      subject: 'Novedad en las solicitudes a comité',
      text: 'Tienes un mensaje nuevo en tu bandeja de notificaciones de Siscomité. Te recomendamos revisarlo para mantenerte informado sobre las últimas novedades en las solicitudes.'
    }

    try {
      await sendEmail(dataValue)
    } catch (error) {
      // Maneja cualquier error que ocurra al enviar el correo electrónico.
    }
  }

  // Renderiza los componentes Badge y Notify.
  return (
    <>
      {notifyOpen ? (
        <></>
      ) : (
        <>
          <Badge onClick={toggleNotify} content={numCount || '0'} shape="circle" color="danger" size="sm">
            <section className="bg-blue-200 rounded-full w-[2rem] h-[2rem] grid place-items-center" onClick={toggleNotify} aria-label="Notificaciones">
              <i className="fi fi-ss-bell text-blue-400 p-[.3rem]" />
            </section>
          </Badge>
        </>
      )}

      <section className="fixed  w-[20rem] right-0">
        <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
      </section>
    </>
  )
}
