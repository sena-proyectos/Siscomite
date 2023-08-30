import "./Modal.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createApprentices, createFicha, getApprenticesById } from "../../../api/httpRequest";
import Swal from "sweetalert2";
import { Toaster, toast } from "sonner";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { readExcelFile } from "../../ReadExcelFile/readexcelfile";
import { Textarea, Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";

export const Modal = ({isOpen, cerrarModal, titulo, modalAdd = false, modalAddGroups = false, modalDetails = false, modalDetailsEdit = false, infoStudents }) => {
  const excelFileRef = useRef(null);
  const { id_ficha } = useParams();

  /* aprendices values */
  const [nombresAprendiz, setNombresAprendiz] = useState("");
  const [apellidosAprendiz, setApellidosAprendiz] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [emailSena, setEmailSena] = useState("");
  const [emailAlterno, setEmailAlterno] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");

  /* fichas values */
  const [numeroFicha, setNumeroFicha] = useState("");
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [jornada, setJornada] = useState("");
  const [etapaPrograma, setEtapaPrograma] = useState("");
  const [numeroTrimestre, setNumeroTrimestre] = useState("");
  const [idModalidad, setIdmodalidad] = useState("");

  const closeModal = () => {
    cerrarModal();
  };

  //Condiciones de agregar ficha
  const [isTrimestreEnabled, setIsTrimestreEnabled] = useState(false);
  const [dataInfoStudent, setDataInfoStudent] = useState([]);

  const handleEtapaChange = (event) => {
    const selectedValue = event.target.value;
    setEtapaPrograma(selectedValue);
    setIsTrimestreEnabled(selectedValue === "Lectiva");
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

  const handleExcelFile = () => {
    const currentFile = excelFileRef.current.files[0];

    const checkFile = excelFileRef.current.files[0].name.split(".");
    if (checkFile[1] !== "xlsx" && checkFile[1] !== "xls") {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Has ingresado un formato inválido. ¡Por favor escoga un formato válido de excel!",
        footer: ".xlsx, .xls",
      });
      excelFileRef.current.value = "";
      return;
    }
    readExcelFile(currentFile, id_ficha);
  };

  /* Enviar datos de las fichas */
  const sendDataFichas = async (e) => {
    e.preventDefault();

    try {
      const dataValue = {
        numero_ficha: numeroFicha,
        nombre_programa: nombrePrograma,
        jornada,
        etapa_programa: etapaPrograma,
        numero_trimestre: numeroTrimestre,
        id_modalidad: idModalidad,
      };

      const response = await createFicha(dataValue);
      const res = response.data.message;
      toast.success("Genial!!", {
        description: res,
      });
      setTimeout(() => {
        cerrarModal();
      }, 1000);
    } catch (error) {
      const message = error.response.data.message;
      toast.error("Opss!!", {
        description: message,
      });
    }
  };

  /* enviar datos de aprendiz */
  const sendDataApprentices = async (e) => {
    e.preventDefault();

    try {
      const dataValue = {
        nombres_aprendiz: nombresAprendiz,
        apellidos_aprendiz: apellidosAprendiz,
        numero_documento_aprendiz: numeroDocumento,
        email_aprendiz_sena: emailSena,
        email_aprendiz_personal: emailAlterno,
        celular_aprendiz: numeroCelular,
        id_documento: tipoDocumento,
        id_ficha,
      };

      const response = await createApprentices(dataValue);

      const res = response.data.message;
      toast.success("Genial!!", {
        description: res,
      });
      setTimeout(() => {
        cerrarModal();
      }, 1500);
    } catch (error) {
      const message = error.response.data.message;
      toast.error("Opss!!", {
        description: message,
      });
    }
  };

  useEffect(() => {
    const infoStudent = async () => {
      try {
        const response = await getApprenticesById(infoStudents);
        const res = response.data.result;
        if (res[0].id_documento === 1) res[0].id_documento = "CC";
        if (res[0].id_documento === 2) res[0].id_documento = "CE";
        if (res[0].id_documento === 3) res[0].id_documento = "TI";
        if (res[0].id_documento === 4) res[0].id_documento = "PEP";
        if (res[0].id_documento === 5) res[0].id_documento = "Registro Civil";
        setDataInfoStudent(res);
      } catch (error) {}
    };
    infoStudent();
  }, []);

  return (
    <>
      <main className="top-0 left-0 h-screen w-full bg-[#0000006a] z-10 fixed flex items-center justify-center backdrop-blur-[3px] ">
        <Toaster position="top-right" closeButton richColors />
        <section className={'bg-white p-[2rem] border-t-[4px] border-[#2e323e] rounded-2xl overflow-auto animate-appearance-in '}>
          <header className="flex justify-center ">
            <h3>{titulo}</h3>
            <section className="absolute flex justify-center items-center h-[25px] w-[25px] text-[10px] top-[15px] left-[90%] max-md:left-[85%] hover:bg-default-100 active:bg-default-200 rounded-full cursor-pointer" onClick={closeModal}>
              <i className="fi fi-br-cross relative top-[1px] text-gray-500 cursor-pointer" onClick={closeModal} />
            </section>
          </header>
          <section className="bodyModal">
            {/* Agregar aprendices */}
            {modalAdd && (
              <section className="relative w-[28rem] max-md:w-[20rem]">
                <section className="relative grid grid-cols-2 justify-center gap-x-8 py-[2rem]  gap-y-8 max-md:gap-y-5 overflow-auto ">
                  <section className="modalInput ">
                    <div className="flex flex-wrap  items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Nombre" labelPlacement={"outside"} variant={"flat"} value={nombresAprendiz} onChange={(e) => setNombresAprendiz(e.target.value)} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Apellido" labelPlacement={"outside"} variant={"flat"} value={apellidosAprendiz} onChange={(e) => setApellidosAprendiz(e.target.value)} />
                    </div>
                  </section>
                  <section>
                    <select className="bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                      <option value="">Tipo de documento*</option>
                      <option value="1">CC</option>
                      <option value="2">CE</option>
                      <option value="3">TI</option>
                      <option value="4">PEP</option>
                    </select>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Documento" labelPlacement={"outside"} variant={"flat"} value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Correo Institucional" labelPlacement={"outside"} variant={"flat"} value={emailSena} onChange={(e) => setEmailSena(e.target.value)} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Correo alterno" labelPlacement={"outside"} variant={"flat"} value={emailAlterno} onChange={(e) => setEmailAlterno(e.target.value)} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired maxLength={"10"} size="md" type="text" label="Número" labelPlacement={"outside"} variant={"flat"} value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} />
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
                    <i className="fi fi-rr-folder-upload text-[18px] mr-[10px]" />
                    Subir Excel
                    <input className="hidden" type="file" name="archivo" ref={excelFileRef} accept=".xlsx, .xls" onChange={handleExcelFile} />
                  </label>
                  <section className="relative grid text  ">
                    <Button variant="shadow" color="primary" id="iconSave" onClick={sendDataApprentices}>
                      <p className="tracking-wide text-15px">Guardar</p>
                      <i className="fi fi-br-check text-[15px]" />
                    </Button>
                  </section>
                </section>
              </section>
            )}
            {/* Información Aprendices */}
            {dataInfoStudent.map((item) => {
              return (
                <section className="mt-[1rem] overflow-hidden w-[30rem] min-w-[50%]" key={item.id_aprendiz}>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Nombre completo</span>
                    <p>
                      {item.nombres_aprendiz} {item.apellidos_aprendiz}
                    </p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Tipo de documento</span>
                    <p>{item.id_documento}</p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Número de documento</span>
                    <p>{item.numero_documento_aprendiz}</p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Correo institucional</span>
                    <p>{item.email_aprendiz_sena}</p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Correo Alterno</span>
                    <p>{item.email_aprendiz_personal}</p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Número</span>
                    <p>{item.celular_aprendiz}</p>
                  </section>
                  <section className="mt-[10px] border-b-2  border-[#0799b6]">
                    <span className="font-bold text-[17px]">Número alteno</span>
                    <p>{item.fijo_aprendiz}</p>
                  </section>
                </section>
              );
            })}
            {/* Agregar grupos */}
            {modalAddGroups && (
              <section className="mt-[2rem]">
                <section className="relative grid grid-cols-2 justify-center gap-8">
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Número de ficha" labelPlacement={"outside"} variant={"flat"} value={numeroFicha} onChange={(e) => setNumeroFicha(e.target.value)} />
                    </div>
                  </section>
                  <section className="modalInput">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input isRequired size="md" type="text" label="Nombre del programa" labelPlacement={"outside"} variant={"flat"} value={nombrePrograma} onChange={(e) => setNombrePrograma(e.target.value)} />
                    </div>
                  </section>
                  <section>
                    <select className=" bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none" value={jornada} onChange={(e) => setJornada(e.target.value)}>
                      <option value="">Jornada*</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                      <option value="Fines de semana">Fines de semana</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-default-100  px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10" required onChange={handleEtapaChange} value={etapaPrograma}>
                      <option value="">Etapa*</option>
                      <option value="Lectiva">Lectiva</option>
                      <option value="Práctica">Práctica</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-default-100 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10" required disabled={!isTrimestreEnabled} value={numeroTrimestre} onChange={(e) => setNumeroTrimestre(e.target.value)}>
                      <option value="">Trimestre lectivo</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </section>
                  <select className="bg-default-100 px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required value={idModalidad} onChange={(e) => setIdmodalidad(e.target.value)}>
                    <option value="">Modalidad</option>
                    <option value="1">Presencial</option>
                    <option value="2">Virtual</option>
                    <option value="3">Media técnica</option>
                    <option value="4">A distancia</option>
                  </select>
                </section>
                <select className="bg-default-100 mt-7 px-[12px] shadow-sm w-full text-small gap-3 rounded-medium h-unit-10 outline-none">
                  <option value="">Coordinador*</option>
                  <option value="Marianela Henao Atehortua">Marianela Henao Atehortua</option>
                  <option value="Jaime León Vergara Areiza">Jaime León Vergara Areiza</option>
                  <option value="Sergio Soto Henao">Sergio Soto Henao</option>
                  <option value="Mauro Isaías Arango Vanegas">Mauro Isaías Arango Vanegas</option>
                </select>
                <section className="relative grid place-items-center mt-[1rem]">
                  <Button variant="shadow" color="primary" id="iconSave" onClick={sendDataFichas}>
                    <p className="tracking-wide text-15px">Guardar</p>
                    <i className="fi fi-br-check text-[15px]" />
                  </Button>
                </section>
              </section>
            )}
            {/* Ver detalles Solicitudes */}
            {modalDetails && (
              <section className="relative top-[1.6rem] w-[30rem]">
                <section className="  place-items-center gap-4 flex justify-between">
                  <Button className="bg-green-200 text-success rounded-2xl ">Aprobado</Button>
                  <section>
                    <input type="date" readOnly className="bg-[#80808036]  text-zinc-500 px-[8px] shadow-sm w-[10rem] text-small gap-3 rounded-medium h-unit-9 outline-none block" />
                  </section>
                </section>
                <section className="relative py-[1.5rem]">
                  <Accordion isCompact variant="bordered">
                    <AccordionItem aria-label="Accordion 1" startContent={<i className="fi fi-rr-user text-purple-500"></i>} title="Información Instructor">
                      <section className="grid-cols-2 gap-2  grid max-h-[200px] justify-center overflow-auto">
                        <section className=" ">
                          <label for="nombre" className="text-[13px] block">
                            Nombre
                            <input type="text" id="nombre" value="Adelaida" readonly className=" bg-[#80808036]  text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block " />
                          </label>
                        </section>
                        <section>
                          <label for="apellidp" className="text-[13px] block">
                            Apellido
                            <input type="text" id="apellido" value="Cano" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="tipo" className="text-[13px] block">
                            Tipo documento
                            <input type="text" id="tipo" value="Cádula ciudadanía" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="documento" className="text-[13px] block">
                            Documento
                            <input type="text" id="docuemento" value="45555543" readonly className="bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="email" className="text-[13px] block">
                            Correo
                            <input type="email" id="email" value="acanom@soy.sena.edu.co" readonly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                        <section>
                          <label for="number" className="text-[13px] block">
                            Número
                            <input type="text" id="number" value="3154567878" readonly className=" bg-[#80808036] text-zinc-500 px-[12px] shadow-sm w-[full] text-small gap-3 rounded-medium h-unit-10 outline-none block" />
                          </label>
                        </section>
                      </section>
                    </AccordionItem>
                    <AccordionItem aria-label="Accordion 2" startContent={<i className="fi fi-rs-book-alt text-red-500"></i>} title="Información Aprendiz">
                      <section className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto">
                        <div className="flex w-[9rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Nombre" defaultValue="Juan Manuel " isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Apellido" defaultValue="Robledo Sanchez" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Tipo  documento" defaultValue="Tarjeta identidad" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Documento" defaultValue="2345434" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Correo" defaultValue="juan@soy.sena.edu.co" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Número" defaultValue="344555553" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Ficha" defaultValue="2373196" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Programa" defaultValue="Análisis y Desarrollo de Software" isReadOnly />
                        </div>
                      </section>
                    </AccordionItem>
                    <AccordionItem aria-label="Accordion 3" startContent={<i className="fi fi-sr-clip text-blue-500"></i>} title="Información Solicitud">
                      <section className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto">
                        <div className="flex w-[9rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Tipo solicitud" defaultValue="Individual" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Coordinador" defaultValue="Marianela Henao" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Categoría causa" defaultValue="Académica" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Calificación causa" defaultValue="Grave" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Input type="text" variant="underlined" label="Artículo" defaultValue="1" isReadOnly />
                        </div>
                        <div className="flex w-[10rem] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
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
                      </section>
                    </AccordionItem>
                  </Accordion>
                </section>
              </section>
            )}
            {/* Editar fichas */}
            {modalDetailsEdit && (
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
            )}
          </section>
        </section>
      </main>
    </>
  );
};
