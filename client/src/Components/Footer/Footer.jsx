import "./Footer.css";

const Footer = () => {
  return (
    <main className="flex justify-center text-[15px]">
      <section className="fixed bottom-0">
        <p className="flex items-center ">
          Siscomite © Centro Tecnológico del Mobiliario - SENA
          <img src="image/logoSena.webp" alt="Sena" className="w-[2rem] ml-[1rem] " />
        </p>
      </section>
    </main>
  );
};

export { Footer };
