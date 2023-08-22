import "./Requests.css";
import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Modal } from "../Utils/Modal/Modal";

const Requests = () => {
  const data = [
    { id: 1, name: "Azul Andres Velez Romero", date: "02/10/2023", value: "Aprobado" },
    { id: 2, name: "Carlos Perez Falcó", date: "02/10/2020", value: "Rechazado" },
    { id: 3, name: "Juan Fernando Pérez del Corral", date: "02/10/2021", value: "Pendiente" },
    { id: 4, name: "Valentina Laverde de la Rosa", date: "02/10/2023", value: "Rechazado" },
    { id: 5, name: "Óscar de la Renta", date: "02/10/2024", value: "Pendiente" },
    { id: 6, name: "Sara Teresa Sánchez del Pinar", date: "02/10/2023", value: "Pendiente" },
    { id: 7, name: "Efraín de las Casas Mejía", date: "02/10/2023", value: "Pendiente" },
    { id: 8, name: "Julieta Ponce de León", date: "02/10/2024", value: "Aprobado" },
    { id: 9, name: "Martín Elías de los Ríos Acosta", date: "02/10/2022", value: "Rechazado" },
    { id: 10, name: "Gabriela de la Pava de la Torre", date: "02/10/2020", value: "Pendiente" },
    { id: 11, name: "Matías de Greiff Rincón", date: "02/10/2023", value: "Aprobado" },
    { id: 12, name: "Manuela del Pino Hincapié", date: "02/10/2021", value: "Rechazado" },
    { id: 13, name: "Sebastián del Campo Yepes", date: "02/10/2021", value: "Aprobado" },
  ];

  // Paginación
  const itemsPerPage = 9; // Número de elementos por página
  const [activePage, setActivePage] = useState(1); //Cuál es la primers página en aparecer

  // Calcula los datos a mostrar en la página actual
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Colores de la tabla dependiendo del estado de aprobación
  const getStatusColorClass = (status) => {
    const statusColorMap = {
      Aprobado: "bg-[#45d48383] text-success rounded-2xl  ",
      Rechazado: "bg-red-200 text-danger rounded-2xl",
      Pendiente: "bg-yellow-200 text-warning rounded-2xl",
    };
    return statusColorMap[status] || "";
  };

  // Modal detalles
  const [modalRequest, setModalDetails] = useState(false);
  const modalDetails = () => {
    setModalDetails(!modalRequest);
  };

 // Modal editar detalles
 const [modalRequestEdit, setModalDetailsEdit] = useState(false);
 const modalDetailsEdit = () => {
   setModalDetailsEdit(!modalRequestEdit);
 };

  return (
    <>
      {modalRequest && <Modal modalDetails cerrarModal={modalDetails} titulo={ <section className="font-semibold text-2xl"><i className="fi fi-rr-file-circle-info text-gray-500 px-3"></i>Detalle de solicitud </section>} />}
      {modalRequestEdit && <Modal modalDetailsEdit cerrarModal={modalDetailsEdit} titulo={<section className="font-semibold text-2xl"><i className="fi fi-rr-refresh text-green-500 px-3"/>Editar información</section>} />}

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full overflow-auto ">
          <header className="p-[1.5rem] flex justify-center">
            <section className="w-[40%]">
              <Search placeholder={"Buscar solicitud"} icon={<i className="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
            </section>
          </header>
          <section className="px-[2rem] top-[.5rem] relative mr-auto ">
            <Table className="h-full">
              <TableHeader>
                <TableColumn>N°</TableColumn>
                <TableColumn>Solicitud</TableColumn>
                <TableColumn>Fecha solicitud</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Detalles</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No hay información disponible."}>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className={` flex justify-center items-center w-[5.5rem] py-[0] relative top-[.5rem] ${getStatusColorClass(item.value)}`}>{item.value}</TableCell>
                    <TableCell>
                      <i className="fi fi-rr-edit px-3 text-xl cursor-pointer hover:text-yellow-300" onClick={modalDetailsEdit}/>
                      <i className="fi fi-rs-eye text-xl cursor-pointer  hover:text-green-600 active:opacity-50" onClick={modalDetails}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className="grid place-items-center w-full mt-[.5rem] ">
              <Pagination className="z-0" total={10} initialPage={1} color={"primary"} totalItemsCount={data.length} onChange={handlePageChange} />
            </section>
          
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export { Requests };
