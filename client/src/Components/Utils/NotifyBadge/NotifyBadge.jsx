import { useEffect, useState } from 'react'
import { userInformationStore } from '../../../store/config'
import { countMessage } from '../../../api/httpRequest'
import { Notify } from '../NotifyBar/NotifyBar'

import { Button, Badge } from '@nextui-org/react'

export const NotifyBadge = () => {
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [numCount, setNumCount] = useState(null)
  const { userInformation } = userInformationStore()

  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen)
  }

  useEffect(() => {
    const messageCount = async () => {
      try {
        const response = await countMessage(userInformation.id_usuario)
        const res = response.data.result[0].num_message
        setNumCount(res)
      } catch (error) {}
    }

    messageCount()
  }, [])

  return (
    <>
      {notifyOpen ? (
        <></>
      ) : (
        <>
          <Badge onClick={toggleNotify} content={numCount} shape="circle" color="danger" size="sm">
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
