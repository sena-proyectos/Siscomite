import { Toaster, toast } from "sonner";
import { Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Input, Button } from "@nextui-org/react";

export const ModalRequest = ({ cerrarModal }) => {
  // Cerrar modal
  const closeModal = () => {
    cerrarModal();
  };
  return (
    <>
      <main className="top-0 left-0 h-screen w-full bg-[#0000006a] z-10 fixed flex items-center justify-center backdrop-blur-[3px] ">
        <Toaster position="top-right" closeButton richColors />
        <section className={`bg-white w-[35rem] p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in `}>
          <header className="flex justify-center ">
            <h3 className="font-semibold text-2xl">
              <i className="fi fi-rr-file-circle-info text-gray-500 px-3"></i>Detalle de solicitud
            </h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" onClick={closeModal} />
            </section>
          </header>

          <section className="relative top-[1.6rem] ">
            <section className="  place-items-center gap-4 flex justify-between">
              <Button className="bg-green-200 text-success rounded-2xl ">Aprobado</Button>
              <section>
                <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
              </section>
            </section>
            <section className="relative py-[1.5rem]">
              <Accordion isCompact variant="bordered">
                <AccordionItem aria-label="Accordion 1" startContent={<i className="fi fi-rr-user text-purple-500"></i>} title="Información Instructor">
                  <section className="grid-cols-2 gap-x-3 gap-y-2  grid max-h-[200px] place-items-center overflow-auto">
                    <section className="w-full">
                      <label htmlFor="nombre" className="text-[13px] block">
                        Nombre
                        <input type="text" id="nombre" value="Adelaida" readOnly className="bg-[#80808036]  text-zinc-500 w-full shadow-sm px-[12px]  text-small  rounded-medium h-unit-10 outline-none block " />
                      </label>
                    </section>
                    <section className="w-full">
                      <label htmlFor="apellidp" className="text-[13px] block">
                        Apellido
                        <input type="text" id="apellido" value="Cano" readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                      </label>
                    </section>
                    <section className="w-full">
                      <label htmlFor="tipo" className="text-[13px] block">
                        Tipo documento
                        <input type="text" id="tipo" value="Cádula ciudadanía" readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                      </label>
                    </section>
                    <section className="w-full">
                      <label htmlFor="documento" className="text-[13px] block">
                        Documento
                        <input type="text" id="docuemento" value="45555543" readOnly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                      </label>
                    </section>
                    <section className="w-full">
                      <label htmlFor="email" className="text-[13px] block">
                        Correo
                        <input type="email" id="email" value="acanom@soy.sena.edu.co" readOnly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                      </label>
                    </section>
                    <section className="w-full">
                      <label htmlFor="number" className="text-[13px] block">
                        Número
                        <input type="text" id="number" value="3154567878" readOnly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-full text-small rounded-medium h-unit-10 outline-none block" />
                      </label>
                    </section>
                  </section>
                </AccordionItem>
                <AccordionItem aria-label="Accordion 2" startContent={<i className="fi fi-rs-book-alt text-red-500"></i>} title="Información Aprendiz">
                  <section className="grid grid-cols-2 gap-x-7 gap-y-2 max-h-[200px] overflow-auto pr-[1rem] ">
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Nombre" defaultValue="Juan Manuel "  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Apellido" defaultValue="Robledo Sanchez"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Tipo  documento" defaultValue="Tarjeta identidad"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Documento" defaultValue="2345434"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Correo" defaultValue="juan@soy.sena.edu.co"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Número" defaultValue="344555553"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Ficha" defaultValue="2373196"  isReadOnly />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Programa" defaultValue="Análisis y Desarrollo de Software"  isReadOnly />
                    </div>
                  </section>
                </AccordionItem>
                <AccordionItem aria-label="Accordion 3" startContent={<i className="fi fi-sr-clip text-blue-500"></i>} title="Información Solicitud">
                  <section className="grid grid-cols-2 gap-x-7 gap-y-2 pr-[1rem] max-h-[200px] overflow-auto">
                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Tipo solicitud" defaultValue="Individual" isReadOnly />
                    </div>
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Coordinador" defaultValue="Marianela Henao" isReadOnly />
                    </div>
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Categoría causa" defaultValue="Académica" isReadOnly />
                    </div>
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Calificación causa" defaultValue="Grave" isReadOnly />
                    </div>
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Artículo" defaultValue="1" isReadOnly />
                    </div>
                    <div className="flex  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input type="text" variant="underlined" label="Evidencias" defaultValue="Descargar" isReadOnly />
                    </div>
                    <section className="flex pt-[1rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Popover
                        showArrow
                        backdrop="opaque"
                        placement="top"
                        classNames={{
                          base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                          arrow: "bg-default-200",
                        }}
                      >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat">
                            Descripción artículo
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-sm w-[10rem]">Lorem ipsum dolor sit amet consectetur adipiscing elit tortor pharetra, primis turpis ornare nostra feugiat viverra placerat leo convallis, volutpat aenean nec habitasse suspendisse urna egestas integer. </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </section>
                    <section className="flex  pt-[1rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Popover
                        showArrow
                        backdrop="opaque"
                        placement="top"
                        classNames={{
                          base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                          arrow: "bg-default-200",
                        }}
                      >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat">
                            Descripción caso
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-sm w-[10rem]">Lorem ipsum dolor sit amet consectetur adipiscing elit tortor pharetra, primis turpis ornare nostra feugiat viverra placerat leo convallis, volutpat aenean nec habitasse suspendisse urna egestas integer. </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </section>
                  </section>
                </AccordionItem>
              </Accordion>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};
