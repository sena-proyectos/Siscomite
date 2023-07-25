import './toast.css'
import { useState } from 'react'

export const Toast = ({ message, classToast = 'success' }) => {
  const [closed, setClosed] = useState(true)

  const closedToast = () => {
    setClosed(false)
  }
  
  return closed ? (
    <main className={`containerToast ${classToast}`}>
      <section>
          <i className="fi fi-br-x closedToast" onClick={closedToast}></i>
        <span>{ message }</span>
      </section>
    </main>
  ) : null
}
