import React, { useState } from "react";
import Swal from "sweetalert2";
import { Toaster, toast } from "sonner";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Textarea } from "@nextui-org/react";

export const ModalEditRequest = ({ cerrarModal }) => {
  // Dropdown detalles de solicitud
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Estado"]));
  const selectedValueDetails = React.useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

  const getStatusColorClass = (status) => {
    const statusColorMap = {
      Aprobado: "bg-green-200 text-success rounded-2xl", // Clase CSS para aprobado
      Rechazado: "bg-red-200 text-danger rounded-2xl", // Clase CSS para rechazado
      Pendiente: "bg-yellow-200 text-warning rounded-2xl", // Clase CSS para pendiente
    };
    return statusColorMap[status] || "text-black"; // Clase CSS por defecto (negro) si el estado no está en el mapa
  };

  // Cerrar modal
  const closeModal = () => {
    cerrarModal();
  };
  return (
    <>
      <main className="top-0 left-0 h-screen w-full bg-[#0000006a] z-10 fixed flex items-center justify-center backdrop-blur-[3px] ">
        <Toaster position="top-right" closeButton richColors />
        <section className={"bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in "}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl">
              <i className="fi fi-rr-refresh text-green-500 px-3" />
              Editar información
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" />
            </section>
          </header>
          <section className="mt-[1.5rem] w-[30rem]">
            <section className="place-items-center gap-4 flex justify-between">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" className={`capitalize ${getStatusColorClass(selectedValueDetails)}`}>
                    {selectedValueDetails}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                  <DropdownItem key="Aprobado">Aprobado</DropdownItem>
                  <DropdownItem key="Pendiente">Pendiente</DropdownItem>
                  <DropdownItem key="Rechazado">Rechazado</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <section>
                <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
              </section>
            </section>
            <section className="w-full grid grid-cols-12  gap-4 py-4">
              <Textarea variant={"faded"} label="Ingresar descripción" labelPlacement="outside" placeholder="Descripción" className="col-span-12 md:col-span-10 mb-6 md:mb-0" />
            </section>
            <section className="flex gap-4 relative py-[5px]">
              <section className="">
                <Button color="primary">
                  <i className="fi fi-br-check"></i>
                  Guardar
                </Button>
              </section>
              <section className=" ">
                <Button color="warning" variant="bordered">
                  <i className="fi fi-rr-pencil"></i>
                  Editar
                </Button>
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};
