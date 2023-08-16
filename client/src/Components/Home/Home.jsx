import "./Home.css";
import { Card } from "../Utils/Card/Card";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const data = [
    { titleHome: "Solicitudes", image: "/image/solicitudes.webp", descripciónHome: "Aquí podrás ver las solicitudes que se han realizado y su estado de aprobación.", Link: "/requests" },
    { titleHome: "Crear solicitud", image: "/image/solicitud.webp", descripciónHome: "Aquí podrás crear una solicitud para un comité de evalución..", Link: "/create" },
    { titleHome: "Fichas", image: "/image/fichas.webp", descripciónHome: "Aquí podrás visualizar las fichas del CTM.", Link: "/groups" },
    { titleHome: "Reglamento", image: "/image/reglamento.webp", descripciónHome: "Aquí podrás ver el reglamento para consultar los artículos necesarios.", Link: "/requests" },
    { titleHome: "Agregar aprendiz", image: "/image/aprendiz.webp", descripciónHome: "Aquí podrás ver y agregar aprendices", Link: "/students" },
  ];

  return (
    <main className="flex flex-row h-screen">
      <Sliderbar />
      <section className="justify-center h-screen  w-full">
        <header className="p-8 grid place-items-center text-[23px]">
          <h1 className="w-80 grid text-[2rem] place-items-center font-extrabold border-b-[1.5px] border-[#0799b6]">Siscomite</h1>
        </header>
        <section className="h-[80vh] flex-wrap flex items-center justify-center gap-x-20">
          {data.map((x, i) => (
            <Link to={x.Link} key={i}>
              <section className="h-[28%] text-black cardHome" style={{ transition: "0.4s ease-in-out" }}>
                <Card inside image={x.image} titleHome={x.titleHome} descripciónHome={x.descripciónHome} />
              </section>
            </Link>
          ))}
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Home };

const SkeletonCard = () => (
  <section className="w-44 h-44 relative">
    <Skeleton className="w-full h-full rounded-lg shadow-lg" />
    <section className="bg-[#ffffffcc] h-3/6 absolute -bottom-1 z-10 w-full flex flex-col  justify-center px-4 rounded-b-[10px]">
      <Skeleton />
      <Skeleton height={13} />
    </section>
  </section>
);
