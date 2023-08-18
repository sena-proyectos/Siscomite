import './Card.css'

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
            <section className="w-52 h-44">
              <span className="object-contain w-44">
                <img className="fondoCard" src={image} alt="Imágen" loading="lazy" />
              </span>
              <div className="w-full h-auto absolute top-[90.5%] left-1/2 rounded-b-[10px] bg-[#ffffffcc] shadow-lg p-4" style={{ transform: 'translate(-50%, -50%)' }}>
                <h4>{titleHome}</h4>
                <p className="bodyText">{descripciónHome}</p>
              </div>
            </section>
          </section>
        )}
        <p className="bodyText">{descripción}</p>

        {flip && (
          <section className="card_flip">
            <section className="front ">{frontContent}</section>
            <section className="border-2 border-blue-200 back ">
              <ul className="list">{backContent}</ul>
            </section>
          </section>
        )}
      </section>
    </main>
  )
}
