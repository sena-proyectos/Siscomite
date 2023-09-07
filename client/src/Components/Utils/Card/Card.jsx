import "./Card.css";

export const Card = ({ title, descripciónHome, titleHome, descripción, image, icon, header = false, click, inside = false }) => {
  return (
    <main className="containerCard" onClick={click}>
      <header className="cardTitle">
        {header && (
          <h4 className="flex gap-6">
            {icon}
            {title}
          </h4>
        )}
      </header>
      <section className="card_Body">
        {inside && (
          <>
            <section className="relative">
              <section className="">
                <img className="rounded-[10px] w-[15rem] h-[11.25rem]" src={image} alt="Imágen" loading="lazy" />
              </section>
              <section className="bg-[#ffffffea] top-[7rem] absolute rounded-b-[10px] max-w-[15rem] py-2 pl-3 shadow-lg h-[7rem] " >
                <h4 className="font-bold">{titleHome}</h4>
                <p className="text-[12px]">{descripciónHome}</p>
              </section>
            </section>
          </>
        )}
        <p className="text-[12px]">{descripción}</p>

      </section>
    </main>
  );
};
