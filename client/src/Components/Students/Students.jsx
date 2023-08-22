import "./Students.css";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { Footer } from "../Footer/Footer";
import React, { useState } from "react";
import {Pagination} from "@nextui-org/react";
import { Modal } from "../Utils/Modal/Modal";

const Students = () => {
  const cards = [
    { title: "Angie Tatiana Mosquera Arco", document: "C.C", descripción: 1027150354, correo: "atmosquera45@soy.sena.edu.co"},
    { title: "Mariano Lore Florez Azul", document: "T.I", descripción: 24567877, correo: "atmosquera45@soy.sena.edu.co" },
    { title: "Guillermo Stiven Bejumeda Morales", document: "C.E", descripción: 34567876, correo: "atmosquera45@soy.sena.edu.co" },
    { title: "Lorena Quiceno Giraldo", document: "C.C", descripción: 49878787, correo: "amosquera45@soy.sena.edu.co" },
    { title: "Juan Guillermo Gomez Zapata", document: "C.C", descripción: 57656787, correo: "atmosquera45@soy.sena.edu.co" },
    { title: "Mariano Lopez Robledo Estrada", document: "T.I", descripción: 655676, correo: "atmosquera45@soy.sena.edu.co" },
    { title: "Mariana Lucia Perez Carol", document: "C.C", descripción: 79876787, correo: "atmosquera45@soy.sena.edu.co" },
    { title: "Estaban Quito Romero Suarez", document: "C.C", descripción: 8766567, correo: "atquera45@soy.sena.edu.co" },
    { title: "Luna Lunera Roble Maria", document: "C.E", descripción: 98765786, correo: "atquera45@soy.sena.edu.co" },
    { title: "Carla María Tibetano De Espana", document: "C.E", descripción: 1076567766, correo: "atmosquera45@soy.sena.edu.co" },
  ];

  const [isFollowed, setIsFollowed] = React.useState(false);

  const itemsPerPage = 9; // Número de elementos por página
  const [activePage, setActivePage] = useState(1);

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [modalStudent, setModalStudent] = useState(false);
  const modalAdd = () => {
    setModalStudent(!modalStudent);
  };

  const [infoStudents, setInfoStudents] = useState(false);
  const infoStudent = () => {
    setInfoStudents(!infoStudents);
  };

  return (
    <>
      {modalStudent && (
        <Modal
          modalAdd
          cerrarModal={modalAdd}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rr-user-add text-green-500 px-3"></i>Agregar Estudiantes
            </section>
          }
        />
      )}
      {infoStudents && (
        <Modal
          modalInfo
          cerrarModal={infoStudent}
          titulo={
            <section className="text-2xl font-semibold">
              <i className="fi fi-rs-file-user text-blue-600 px-3"></i>Información
            </section>
          }
        />
      )}

      <main className="flex h-screen">
        <Sliderbar />
        <section className="w-full h-screen overflow-auto">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={"Buscar soicitud"} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>
            <section className=" relative grid justify-end px-[4.5rem] py-0">
              <p className="font-semibold text-lg">Análisis y desarrollo de software</p>
              <p className="grid justify-end ">2473196</p>
            </section>
          <section className="flex flex-wrap gap-5 items-center justify-center p-2 ">
            {currentItems.map((item) => {
              return (
                <Card className="w-[340px] z-0 shadow-lg" key={item.title}>
                  <CardHeader className="justify-between pb-0 ">
                    <div className="flex gap-5 ">
                      <i className="fi fi-rr-circle-user text-purple-500 text-[2rem]"></i>
                      <div className="flex flex-col gap-1 items-start justify-center ">
                        <h4 className="text-small font-semibold leading-none text-default-600">{item.title}</h4>
                        <h5 className="text-small tracking-tight text-default-400 flex">
                          <p className="px-[4px]">{item.document}</p>  
                          <p className="px-[4px]">{item.descripción}</p>
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="relarive  text-black text-small">
                    <p className="relative bottom-1 ">{item.correo}</p>
                  </CardBody>
                </Card>
              ); 
            })}
          </section>
          <section className="grid place-items-center">
            <Pagination className="relative top-[.5rem] z-0" total={10} initialPage={1} color={"primary"} totalitemscount={cards.length} onChange={handlePageChange} />
          </section>
          <section className="absolute grid place-items-center bottom-9 right-8">
            <button className="w-[60px] h-[60px] rounded-full text-white shadow-md text-2xl bg-[#2e323e] relative cursor-pointer outline-none border-none add" onClick={modalAdd}>
              +
            </button>
          </section>
          <section className="relative">
            <Footer />
          </section>
        </section>
      </main>
    </>
  );
};

export { Students };
