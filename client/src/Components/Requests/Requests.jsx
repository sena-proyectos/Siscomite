import "./Requests.css";
import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
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

  // Modal
  const [modalRequest, setModalDetails] = useState(false);
  const modalDetails = () => {
    setModalDetails(!modalRequest);
  };

  return (
    <>
      {modalRequest && <Modal modalDetails cerrarModal={modalDetails} titulo={<section className="font-semibold text-2xl">Detalle de solicitud</section>} />}

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full ">
          <header className="grid place-items-center py-[.5rem] relative top-[.5rem]">
            <Search placeholder={"Buscar solicitud"} icon={<i class="fi fi-rr-settings-sliders relative left-[-3rem]" />} />
          </header>
          <section className="px-[2rem] top-[1.5rem] relative mr-auto">
            <Table>
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
                      <Button className="h-[1.5rem]" variant="shadow" color="primary" size="sm" onClick={modalDetails}>
                        Ver más
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className="grid place-items-center">
              <Pagination className="relative top-[.5rem] z-0" total={10} initialPage={1} color={"primary"} totalItemsCount={data.length} onChange={handlePageChange} />
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export { Requests };
