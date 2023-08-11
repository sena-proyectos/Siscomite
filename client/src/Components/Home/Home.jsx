import "./Home.css";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import image from "../../assets/image/solicitudes.jpg";
import image2 from "../../assets/image/solicitud.jpg";
import image3 from "../../assets/image/fichas.jpg";
import image4 from "../../assets/image/reglamento.jpg";
import image5 from "../../assets/image/aprendiz.jpg";

const Home = () => {
  return (
    <main className="containerHome">
      <Sliderbar />
      <section className="homeContent">
        <header className="headerTitle">
          <h1 className="titleHome">Siscomite</h1>
        </header>
        <section className="cardBody">
          <Link>
            <section className="cardHome">
              <Card inside image={image} titleHome={"Solicitudes"} descripciónHome={"Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación."} />
            </section>
          </Link>
          <Link>
            <section className="cardHome">
              <Card inside image={image2} titleHome={"Crear Solicitud"} descripciónHome={"Aquí podrás crear una solicitud para un comité de evalución."} />
            </section>
          </Link>
          <Link>
            <section className="cardHome">
              <Card inside image={image3} titleHome={"Fichas"} descripciónHome={"Aquí podrás visualizar las fichas del CTM."} />
            </section>
          </Link>

          <Link>
            <section className="cardHome">
              <Card inside image={image4} titleHome={"Reglamento"} descripciónHome={"Aquí podrás ver el reglamento para consultar los artículos necesarios."} />
            </section>
          </Link>
          <Link>
            <section className="cardHome">
              <Card inside image={image5} titleHome={"Agregar Aprendiz"} descripciónHome={"Aquí podrás Agregar aprendices."} />
            </section>
          </Link>
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Home };
