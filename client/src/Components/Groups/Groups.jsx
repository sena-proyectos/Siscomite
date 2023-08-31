import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Pagination, Button } from "@nextui-org/react";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Notify } from "../Utils/NotifyBar/NotifyBar";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { ModalAddGroups } from "../Utils/Modals/ModalAddGroup";
import { getFichas } from "../../api/httpRequest";
import "./Groups.css";

const Groups = () => {
  const [isOpen] = useState(false);
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

  // Modal detalles
  const [modalGroups, setModalGroups] = useState(false);
  const modalAddGroups = () => {
    setModalGroups(!modalGroups);
  };

  // Barra de notificaciones
  const [notifyOpen, setNotifyOpen] = useState(false);

  const toggleNotify = () => {
    setNotifyOpen(!notifyOpen);
  };

  return (
    <>
      {modalGroups && <ModalAddGroups modalAddGroups={isOpen} cerrarModal={modalAddGroups} />}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-screen overflow-auto">
          <header className="p-[1.5rem] flex justify-center items-center">
            <section className="w-[40%]">
              <Search placeholder={"Buscar ficha"} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
            <section className="absolute right-[15%] cursor-pointer ">
              {notifyOpen ? (
                <></>
              ) : (
                <>
                  <Button radius="full" variant="flat" color="success" onClick={toggleNotify}>
                    Mensajes
                    <i className="fi fi-ss-bell pl-[.5rem]" />
                  </Button>
                </>
              )}
            </section>
          </header>

          <section className="grid place-items-center h-[75vh] max-[935px]:h-screen max-sm:h-[200%] max-[935px]:p-5">
            <section className="mx-auto gap-5 grid grid-cols-3 w-[80%] max-[935px]:w-full max-[935px]:grid-cols-2  max-sm:grid-cols-1  ">
              {visibleCards.map((card) => (
                <Link to={`/students/${card.id_ficha} `} key={card.id_ficha}>
                  <Card className={`card w-full h-[11.5rem] border-2 border-blue-200 ${hoveredCards[card.id_ficha] ? "hovered" : ""}`} onMouseEnter={() => handleCardHover(card.id_ficha)} onMouseLeave={() => handleCardLeave(card.id_ficha)}>
                    <CardHeader className="gap-3 flex justify-center z-0">
                      <section className="flex bg-blue-200 py-2 justify-center rounded-xl w-full">
                        <p className="text-xl font-bold ">{card.numero_ficha}</p>
                      </section>
                    </CardHeader>
                    <CardBody className="h-[5rem]">
                      <p className="text-[16px]">{card.nombre_programa}</p>
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
            <Pagination className="relative z-0 max-[935px]:pb-[3rem]" total={totalPages || 1} initialPage={1} color={"primary"} totalitemscount={totalPages} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8" >
            <button className="w-[13rem] h-[60px] rounded-3xl text-white shadow-2xl  bg-[#2e323e] relative cursor-pointer outline-none border-none active:bg-[#87a0ec] active:transform active:scale-90 transition duration-150 ease-in-out" onClick={modalAddGroups}>
              <p className="text-[15px] top-0 block">
                <i className="fi fi-br-plus block" />
                Agregar fichas
              </p>
            </button>
            <Notify isOpen={notifyOpen} toggleNotify={toggleNotify} />
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export { Groups };
