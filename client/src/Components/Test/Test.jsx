import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { CustomTable } from "../Utils/Table/Table";

export const Text = () => {
  const data = [
    { title1: "Número ficha", title2: "Programa", title3: "Coordinador", title4: "Modalidad", title5: "Jornada" ,description1: "hola" }

  ];
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const [isGridView, setIsGridView] = useState(true); // Estado para rastrear la vista activa
  const [isCardVisible, setIsCardVisible] = useState(true); // Nuevo estado para la visibilidad de la tarjeta 

  const toggleView = () => {
    if (isGridView) {
      setGridCols("grid-cols-2");
    } else {
      setGridCols("grid-cols-1");
    }
    setIsGridView((prevView) => !prevView); // Cambiar el estado de la vista
  };

  const toggleContent = () => {
    setIsCardVisible((prevVisibility) => !prevVisibility); // Cambiar la visibilidad de la tarjeta
  };

  return (
    <>
      <main className="h-screen">
        <header className="bg-red-500 h-[5rem] grid justify-center items-center">
          {isGridView ? (
            <>
              <i className={`fi fi-rr-grid block cursor-pointer `} onClick={toggleView}></i>
              <i
                className={`fi fi-rr-list block cursor-pointer ${!isGridView ? "hidden" : "opacity-100"}`}
                onClick={() => {
                  toggleView();
                  toggleContent();
                }}
              ></i>
            </>
          ) : (
            <>
              <i className={`fi fi-rr-list block cursor-pointer `} onClick={toggleView}></i>
              <i
                className={`fi fi-rr-grid block cursor-pointer ${isGridView ? "hidden" : "opacity-100"}`}
                onClick={() => {
                  toggleView();
                  toggleContent();
                }}
              ></i>
            </>
          )}
        </header>
        <section>
          <section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {" "}
              {/* Aplicar la clase grid-cols */}
              {isCardVisible && (
                <Card className={`card w-[20rem] h-[11.5rem] border-2 border-blue-200 mt-[1rem]`}>
                  <CardHeader className="gap-3 flex justify-center z-0">
                    <section className="flex bg-blue-200 py-2 justify-center rounded-xl w-full">
                      <p className="text-xl font-bold ">2345666</p>
                    </section>
                  </CardHeader>
                  <CardBody className="h-[5rem]">
                    <p className="text-[16px]">Adso</p>
                  </CardBody>

                  <CardFooter>
                    <p className="text-gray-500 text-md"> Marianela Henao</p>
                  </CardFooter>
                </Card>
              )}
              {/* <section className="mt-[3rem]"> */}
              {!isCardVisible && (
                <section>
                  {data.map((item, index) => (
                    <section key={index}>
                      <CustomTable 
                      title1={item.title1} 
                      title2={item.title2} 
                      title3={item.title3} 
                      title4={item.title4} 
                      title5={item.title5} 
                      description1={item.description1} 
                      description2={item.description2} 
                      description3={item.description3} 
                      description4={item.description4} 
                      description5={item.description5} />
                    </section>
                  ))}
                </section>
              
              )}
              {/* </section> */}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};
