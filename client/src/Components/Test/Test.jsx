import React, { useEffect, useState } from "react";

export const Text = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    // Simulamos un retraso de 3 segundos antes de permitir el cierre
    const notificationTimeout = setTimeout(() => {
      setCanClose(true); // Después de 3 segundos, permitir el cierre manual
    }, 10);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(notificationTimeout);
  }, []);

  const handleClose = () => {
    if (canClose) {
      setShowNotification(false); // Solo cierra si se permite el cierre manual
    }
  };

  return (
    <>
      {showNotification && (
        <main className="h-screen w-screen absolute inset-0 z-20 grid place-content-center">
          <section className="h-[10rem] animate-appearance-in  p-4 bg-red-500 text-white rounded-xl shadow-lg z-20">
            <header className="flex gap-4">
              <p>¡Bienvenido a nuestra página! Gracias por visitarnos.</p>
              <i className="fi fi-br-cross text-xs cursor-pointer" onClick={handleClose}></i>
            </header>
          </section>
          <section className="inset-0 bg-[#0000006a]  -z-10 fixed flex items-center justify-center " onClick={handleClose}/>
        </main>
      )}
    </>
  )
}
