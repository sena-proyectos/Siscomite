// Importación del archivo de estilos CSS
import "./Footer.css";

// Definición del componente Footer
const Footer = () => {
  return (
    // Contenedor principal del pie de página
    <main className="flex justify-center text-[15px]">
      <section className="fixed bottom-0">
        {/* Texto y logotipo del pie de página */}
        <p className="flex items-center ">
          {/* Texto de copyright */}
          Siscomite © Centro Tecnológico del Mobiliario - SENA
          {/* Logotipo del SENA */}
          <img src="/image/logoSena.webp" alt="Sena" className="w-[2rem] ml-[1rem]" />
        </p>
      </section>
    </main>
  );
};

// Exportación del componente Footer para su uso en otros archivos
export { Footer };
