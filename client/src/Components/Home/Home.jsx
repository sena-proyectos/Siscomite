import "./Home.css";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import image from "../../assets/image/inicio.avif";

const Home = () => {
  return (
    <main className="containerHome">
      <Sliderbar />
      <section className="cardHome">
      <Card 
        className="card_Home"
        image={image} 
        title={"Solicitudes"} 
        descripción={"Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación."} />
      </section>
      <section className="cardHome">
      <Card 
        className="card_Home"
        image={image} 
        title={"Crear Solicitud"} 
        descripción={"Aquí podrás crear una solicitud para un comité de evalución."} />
      </section>
      <section className="cardHome">
      <Card 
        className="card_Home" 
        image={image} 
        title={"Fichas"} 
        descripción={"Aquí podrás visualizar las fichas del CTM."} />
      </section>
      <section className="cardHome">
      <Card 
        className="card_Home"
        image={image} 
        title={"Reglamentos"} 
        descripción={"Aquí podrás ver el reglamento para consultar los artículos necesarios."} />
      </section>
    </main>
  );
};

export { Home };
