import "./Home.css";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";
import image from "../../assets/image/inicio.avif";

const Home = () => {
  return (
    <main className="containerHome">
      <Sliderbar />
      <section className="homeContent">
        <header className="headerTitle">
          <h1 className="titleHome">Siscomite</h1>
        </header>
        <section className="cardBody">
          <section className="cardHome">
            <Card depende header className="card_Home" image={image} title={"Solicitudes"} descripción={"Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación."} />
          </section>
          <section className="cardHome">
            <Card depende header className="card_Home" image={image} title={"Crear Solicitud"} descripción={"Aquí podrás crear una solicitud para un comité de evalución."} />
          </section>
          <section className="cardHome">
            <Card depende header className="card_Home" image={image} title={"Fichas"} descripción={"Aquí podrás visualizar las fichas del CTM."} />
          </section>
          <section className="cardHome">
            <Card depende header className="card_Home" image={image} title={"Reglamentos"} descripción={"Aquí podrás ver el reglamento para consultar los artículos necesarios."} />
          </section>
          <section className="cardHome">
            <Card depende header className="card_Home" image={image} title={"Agregar Aprendiz"} descripción={"Aquí podrás Agregar aprendices."} />
          </section>
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Home };
