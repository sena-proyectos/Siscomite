import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Pagination, Tooltip, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Modal } from "../Utils/Modal/Modal";
import "./Groups.css";
import { getFichas } from "../../api/httpRequest";

const Groups = () => {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const getFicha = async () => {
      try {
        const response = await getFichas();
        const res = response.data.result;
        setFichas(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (fichas.length >= 0) {
      getFicha();
    }
  }, [fichas]);

  const itemsPerPage = 6;
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const startIdx = (activePage - 1) * itemsPerPage;
  const visibleCards = fichas.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(fichas.length / itemsPerPage);

  const [modalGroups, setModalGroups] = useState(false);
  const modalAddGroups = () => {
    setModalGroups(!modalGroups);
  };

  // Hover cards
  const [hoveredCards, setHoveredCards] = useState({});

  // Función para activar el hover en una card
  const handleCardHover = (id) => {
    setHoveredCards((prevHovered) => ({
      ...prevHovered,
      [id]: true,
    }));
  };

  // Función para desactivar el hover en una card
  const handleCardLeave = (id) => {
    setHoveredCards((prevHovered) => ({
      ...prevHovered,
      [id]: false,
    }));
  };

  return (
    <>
      {modalGroups && (
        <Modal
          modalAddGroups
          cerrarModal={modalAddGroups}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rr-users-medical text-green-500 px-3"></i>Agregar Fichas
            </section>
          }
        />
      )}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-screen overflow-auto">
          <header className="p-[1.5rem] flex justify-center items-center">
            <section className="w-[40%]">
              <Search placeholder={"Buscar ficha"} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>

          <section className="containerGroup grid place-items-center h-[75vh] ">
            <section className="contentGroup mx-auto gap-5 grid grid-cols-3 w-[80%]  max-w-[1000px] ">
              {visibleCards.map((card) => (
                <Link to={`/students/${card.id_ficha} `} key={card.id_ficha}>
                  <Card className={`card w-full border-2 border-blue-200 ${hoveredCards[card.id_ficha] ? "hovered" : ""}`} onMouseEnter={() => handleCardHover(card.id_ficha)} onMouseLeave={() => handleCardLeave(card.id_ficha)}>
                    <CardHeader className="gap-3 flex justify-center z-0">
                      <section className="flex bg-blue-200 py-2 justify-center rounded-xl w-full">
                        <p className="text-xl font-bold ">{card.numero_ficha}</p>
                      </section>
                    </CardHeader>
                    <CardBody className="h-full">
                      <p className="text-lg">{card.nombre_programa}</p>
                    </CardBody>

                    <CardFooter>
                      <p className="text-gray-500 text-md"> Marianela Henao</p>
                    </CardFooter>
                  </Card>

                  <section className={`animate-appearance-in absolute mt-[-11rem] ml-[2.5rem] z-10 p-4 w-[14rem] shadow-lg rounded-xl bg-blue-300 text-white  ${hoveredCards[card.id_ficha] ? "" : "hidden"}`}>
                    <p className="font-bold">
                      Jornada: <span className="font-normal">{card.jornada}</span>
                    </p>
                    <p className="font-bold">
                      Etapa: <span className="font-normal">{card.etapa_programa}</span>
                    </p>
                  </section>
                </Link>
              ))}
            </section>
          </section>
          <section className="grid place-items-center  mt-[.5rem] ">
            <Pagination className="relative z-0" total={totalPages || 1} initialPage={1} color={"primary"} totalitemscount={totalPages} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8" onClick={modalAddGroups}>
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-md text-3xl bg-[#2e323e] relative">+</button>
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export { Groups };
