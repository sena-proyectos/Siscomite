import './toast.css'
import { useState,useEffect } from 'react'

export const Toast = ({ message, typeToast = 'success', onClose  }) => {
  const [closed, setClosed] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosed(false);
      onClose(); 
    }, 2500); 

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setClosed(false);
    onClose(); 
  };

  return closed ? (
    <div className={`containerToast ${typeToast}`}>
      <div className="sectionToast">
        <i className="fi fi-br-x closedToast" onClick={handleClose} ></i>
        <span>{message}</span>
      </div>
    </div>
  ) : null
}
