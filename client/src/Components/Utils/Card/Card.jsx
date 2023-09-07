import "./Card.css";

export const Card = ({ title, descripciónHome, titleHome, descripción, image, icon, flip = false, header = false, click, inside = false, frontContent, backContent }) => {
  return (
    <main className="containerCard" onClick={click}>
      <header className="cardTitle">
        {header && (
          <h4 className="card_title">
            {title}
            {icon}
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

        {flip && (
          <section className="card_flip ">
            <section className="front ">{frontContent}</section>
            <section className="border-2 border-blue-200 back ">
              <ul className="list text-lg">{backContent}</ul>
            </section>
          </section>
        )}
      </section>
    </main>
  );
};
