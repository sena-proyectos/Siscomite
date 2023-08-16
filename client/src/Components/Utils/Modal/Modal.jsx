import "./Modal.css";
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio, Link } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const Modal = ({ cerrarModal, titulo, modalAdd = false, modalInfo = false, modalAddGroups = false, modalDetails = false, modalDetailsEdit = false }) => {
  const closeModal = () => {
    cerrarModal();
  };

  //Condiciones de agregar ficha
  const [isTrimestreEnabled, setIsTrimestreEnabled] = useState(false);

  const handleEtapaChange = (event) => {
    const selectedValue = event.target.value;
    setIsTrimestreEnabled(selectedValue === "lectiva");
  };

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

  return (
    <>
      <main className="top-0 left-0 h-screen w-full bg-[#0000006a] z-10 fixed flex items-center justify-center backdrop-blur-[3px] ">
        <section className="bg-white p-[2rem] border-t-[4px] border-[#2e323e] w-[35%] rounded-2xl overflow-auto" style={{ animation: "bounce 0.8s ease-in-out" }}>
          <header className="flex justify-center ">
            <h3>{titulo}</h3>
            <i className="fi fi-br-cross relative left-[20%]" onClick={closeModal} />
          </header>
          <section className="bodyModal">
            {/* Agregar aprendices */}
            {modalAdd && (
              <section className="relative py-[1rem] overflow-auto ">
                <section className="relative flex flex-wrap justify-center gap-x-7 py-5 gap-y-8 overflow-auto ">
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Nombre" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Apellido" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section>
                    <select className="bg-default-100 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10 outline-none">
                      <option value="">Tipo de documento</option>
                      <option value="">CC</option>
                      <option value="">TI</option>
                      <option value="">PE</option>
                    </select>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Documento" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Correo Institucional" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Correo alterno" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número alterno" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                </section>
                <section className="flex justify-center gap-5">
                  <label className="cursor-pointer inline-block text-[white] bg-red-700 text-center px-[20px] py-[8px] text-[15px] tracking-wide select-none shadow-lg rounded-[10px]  active:transform active:scale-90">
                    <i class="fi fi-rr-folder-upload text-[18px] mr-[10px]" />
                    Subir Excel
                    <input className="hidden" type="file" name="archivo" />
                  </label>
                  <section className="relative grid text  ">
                    <Button variant="shadow" color="primary" id="iconSave">
                      <p className="tracking-wide text-15px">Guardar</p>
                      <i className="fi fi-br-check text-[15px]" />
                    </Button>
                  </section>
                </section>
              </section>
            )}
            {/* Información Aprendices */}
            {modalInfo && (
              <section className="mt-[1rem] overflow-hidden min-w-[50%]">
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Nombre completo</span>
                  <p>Mariana Lopez Robledo Estrada</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Tipo de documento</span>
                  <p>Cédula de ciudadanía</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Número de documento</span>
                  <p>12345678</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Correo institucional</span>
                  <p>mariana34@soy.sena.edu.co</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Correo Alterno</span>
                  <p>marinalopez@gmail.com</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Número</span>
                  <p>3245555555</p>
                </section>
                <section className="mt-[10px] border-b-2  border-[#0799b6]">
                  <span className="font-bold text-[17px]">Número alteno</span>
                  <p>6666666</p>
                </section>
              </section>
            )}
            {/* Agregar Fichas */}
            {modalAddGroups && (
              <section className="modalGruop ">
                <section className="relative flex flex-wrap justify-center top-5 gap-x-7 gap-y-6">
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número de ficha" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section className="modalInput">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Nombre del programa" labelPlacement={"outside"} variant={"flat"} />
                    </div>
                  </section>
                  <section>
                    <select className="bg-default-100 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10 outline-none">
                      <option value="">Jornada</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                      <option value="Noche">Fines de semana</option>
                      <option value="Noche">Virtual</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-default-100  px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required onChange={handleEtapaChange}>
                      <option value="">Etapa</option>
                      <option value="lectiva">Lectiva</option>
                      <option value="practica">Práctica</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-default-100 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required disabled={!isTrimestreEnabled}>
                      <option value="">Trimestre lectivo</option>
                      <option value="lectiva">1</option>
                      <option value="practica">2</option>
                      <option value="practica">3</option>
                      <option value="practica">4</option>
                      <option value="practica">5</option>
                      <option value="practica">6</option>
                    </select>
                  </section>
                  <select className="bg-default-100 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required>
                    <option value="">Modalidad</option>
                    <option value="vitual">Vitual</option>
                    <option value="presencial">Presencial</option>
                    <option value="media_tecnica">Media Técnica</option>
                    <option value="distancia">A distancia</option>
                    <option value="virtual">Virtual</option>
                  </select>
                  <section className="relative">
                    <Button variant="shadow" color="primary" id="iconSave">
                      <p className="tracking-wide text-15px">Guardar</p>
                      <i className="fi fi-br-check text-[15px]" />
                    </Button>
                  </section>
                </section>
              </section>
            )}
            {/* Ver detalles Solicitudes */}
            {modalDetails && (
              <section className="relative top-[1.6rem]   ">
                <section className="  place-items-center gap-4 flex justify-between">
                  <Button className="bg-green-200 text-success rounded-2xl ">Aprobado</Button>
                  <section>
                    <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
                  </section>
                </section>
                <section className="relative py-[1.5rem]">
                  <Accordion isCompact variant="bordered">
                    <AccordionItem aria-label="Accordion 1" startContent={<i class="fi fi-rr-user text-purple-500"></i>} title="Información Instructor">
                      <section className="flex flex-wrap gap-4 justify-center">
                        <label for="nombre" className="text-[13px] block">
                          Nombre
                          <input type="text" id="nombre" value="Adelaida" readonly className=" bg-[#80808036]  text-zinc-500 px-[12px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-10 outline-none block " />
                        </label>
                        <section>
                          <label for="apellidp" className="text-[13px] block">
                            Apellido
                            <input type="text" id="apellido" value="Cano" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="tipo" className="text-[13px] block">
                            Tipo documento
                            <input type="text" id="tipo" value="Cádula ciudadanía" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="documento" className="text-[13px] block">
                            Documento
                            <input type="text" id="docuemento" value="45555543" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="email" className="text-[13px] block">
                            Correo
                            <input type="text" id="email" value="acanom@soy.sena.edu.co" readonly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                      </section>
                    </AccordionItem>
                    <AccordionItem aria-label="Accordion 2" startContent={<i class="fi fi-sr-clip text-blue-500"></i>} title="Información Solicitud">
                      <section className="flex flex-wrap max-h-[200px] overflow-auto">
                        <div className="flex w-[9rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Cordinador" defaultValue="Marianela Henao" isReadOnly />
                        </div>
                        <div className="flex w-[9rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Tipo solicitud" defaultValue="Individual" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Categoría causa" defaultValue="Acádemica" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Calificación causa" defaultValue="Leve" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Descripción" defaultValue="No ha respondido con los trabajos asignados" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue=" "  isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Evidencias" defaultValue={<Link to={""}>Link evidencias</Link>} isReadOnly />
                        </div>
                      </section>
                    </AccordionItem>
                  </Accordion>
                </section>
              </section>
            )}
            {modalDetailsEdit && (
              <section className="mt-[1.5rem]">
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
                      <i class="fi fi-br-check"></i>
                      Guardar
                    </Button>
                  </section>
                  <section className=" ">
                    <Button color="warning" variant="bordered">
                      <i class="fi fi-rr-pencil"></i>
                      Editar
                    </Button>
                  </section>
                </section>
              </section>
            )}
          </section>
        </section>
      </main>
    </>
  );
};
