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
          <section className="w-full">
            <section className="w-48 h-44">
              <span className="object-contain w-44">
                <img className="rounded-[10px]" src={image} alt="Imágen" loading="lazy" />
              </span>
              <div className="w-full h-[7rem] absolute top-[80%] left-1/2 rounded-b-[10px] bg-[#ffffffea] shadow-lg py-2 px-3" style={{ transform: "translate(-50%, -50%)" }}>
                <h4 className="font-bold">{titleHome}</h4>
                <p className="text-[12px]">{descripciónHome}</p>
              </div>
            </section>
          </section>
        )}
        <p className="text-[12px]">{descripción}</p>

        {flip && (
          <section className="card_flip">
            <section className="front ">{frontContent}</section>
            <section className="border-2 border-blue-200 back ">
              <ul className="list">
                {backContent.map((item, index) => (
                  <li key={index} className="listItem ">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </section>
        )}
      </section>
    </main>
  );
};
