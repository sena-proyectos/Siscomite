import { getRequestById } from '../../api/httpRequest'
import { useState, useEffect } from 'react'

export const Text = () => {
  const [data, setRequestData] = useState([])
  const requestID = 33

  useEffect(() => {
    const getIdRequest = async (requestID) => {
      try {
        const response = await getRequestById(requestID)
        const res = response.data.result

        setRequestData(res)
      } catch (error) {
        console.log(error)
      }
    }

    getIdRequest(requestID)
  }, [requestID])

  return <div></div>
}
