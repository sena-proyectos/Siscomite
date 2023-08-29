import React, { useState } from "react";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";
import { Textarea, Button, Input } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Test } from "../Test/Test";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const Rules = () => {
  const [inputVisibleCap, setInputVisibleCap] = useState(false);
  const [inputVisibleArt, setInputVisibleArt] = useState(false);
  const [inputVisibleNumeral, setInputVisibleNumeral] = useState(false);
  const [inputVisibleParagrafos, setInputVisibleParagrafos] = useState(false);

  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Drop capítulo
  const [selectedKeysCaps, setSelectedKeysCaps] = React.useState(new Set(["Seleccionar capítulos"]));
  const selectedValueCaps = React.useMemo(() => Array.from(selectedKeysCaps).join(", ").replaceAll("_", " "), [selectedKeysCaps]);

  const [changeButtonCap, setChangeButtonCap] = useState(false);

  const CapAddButtonClick = () => {
    setInputVisibleCap(!inputVisibleCap);
    setChangeButtonCap(!changeButtonCap);
  };
  // Drop artículo
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar artículos"]));
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

  const [changeButtonArt, setChangeButtonArt] = useState(false);

  const ArtAddButtonClick = () => {
    setInputVisibleArt(!inputVisibleArt);
    setChangeButtonArt(!changeButtonArt);
  };
  // Drop parágrafo
  const [selectedKeysParagrafos, setSelectedKeysParagrafos] = React.useState(new Set(["Seleccionar parágrafos"]));
  const selectedValueParagrafos = React.useMemo(() => Array.from(selectedKeysParagrafos).join(", ").replaceAll("_", " "), [selectedKeysParagrafos]);

  const [changeButtonParagrafos, setChangeButtonParagrafos] = useState(false);

  const ParagrafosAddButtonClick = () => {
    setInputVisibleParagrafos(!inputVisibleParagrafos);
    setChangeButtonParagrafos(!changeButtonParagrafos);
  };

  // Input numeral
  const [changeButtonNumeral, setChangeButtonNumeral] = useState(false);

  const NumeralAddButtonClick = () => {
    setInputVisibleNumeral(!inputVisibleNumeral);
    setChangeButtonNumeral(!changeButtonNumeral);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className=" border-t-[4px] border-[#2e323e] backdrop-blur-[3px]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1">
                <p className="text-2xl">
                  <i className="fi fi-rr-edit text-warning pr-[.5rem]"></i>
                  Editar Reglamento
                </p>
              </ModalHeader>
              <ModalBody>
                <section className=" grid grid-cols-2">
                  <section className="relative p-[1rem] ">
                    <section className="pr-[1rem] flex">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" color="primary" className="w-full">
                            {selectedValueCaps}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeysCaps={selectedKeysCaps} onSelectionChange={setSelectedKeysCaps}>
                          <DropdownItem key="Capítulo 1">Capítulo 1</DropdownItem>
                          <DropdownItem key="Capítulo  2">Capítulo 2</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <section className="pl-3">
                        <Button isIconOnly color="primary" onClick={CapAddButtonClick}>
                          {changeButtonCap ? "-" : "+"}
                        </Button>
                      </section>
                    </section>
                    <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleCap ? "" : "hidden"}`}>
                      <Input type="text" size="sm" label="Agregar capítulo" color="primary" variant="faded" />
                      <Textarea name="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                    </section>
                  </section>

                  <section className="relative p-[1rem]">
                    <section className="pr-[1rem] flex">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" color="primary" className="w-full">
                            {selectedValue}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                          <DropdownItem key="Artículo 1">Artículo 1</DropdownItem>
                          <DropdownItem key="Artículo 2">Artículo 2</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <section className="px-3">
                        <Button isIconOnly color="primary" onClick={ArtAddButtonClick}>
                          {changeButtonArt ? "-" : "+"}
                        </Button>
                      </section>
                    </section>
                    <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleArt ? "" : "hidden"}`}>
                      <Input type="text" size="sm" label="Agregar artículo" color="primary" variant="faded" />
                      <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                    </section>
                  </section>

                  <section className="relative p-[1rem] ">
                    <section className=" flex pr-[.3rem]">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" color="primary" className="w-full ">
                            {selectedValueParagrafos}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Single selection example" variant="flat" disallowEmptySelection selectionMode="single" selectedKeysParagrafos={selectedKeysParagrafos} onSelectionChange={setSelectedKeysParagrafos}>
                          <DropdownItem key="Parágrafo 1">Parágrafo 1</DropdownItem>
                          <DropdownItem key="Parágrafo 2">Parágrafo 2</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <section className="px-3">
                        <Button isIconOnly color="primary" onClick={ParagrafosAddButtonClick}>
                          {changeButtonParagrafos ? "-" : "+"}
                        </Button>
                      </section>
                    </section>
                    <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleParagrafos ? "" : "hidden"}`}>
                      <Input type="text" size="sm" label="Agregar paragrafo" color="primary" variant="faded" />
                      <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                    </section>
                  </section>

                  <section className="relative  p-[1rem]">
                    <section className="pr-[1rem] flex">
                      <Input type="number" labelPlacement="outside" label="Seleccionar numeral" variant="faded" />
                      <section className="px-3">
                        <Button isIconOnly color="primary" onClick={NumeralAddButtonClick}>
                          {changeButtonNumeral ? "-" : "+"}
                        </Button>
                      </section>
                    </section>
                    <section className={`w-full pt-2 rounded-[13px] animate-appearance-in ${inputVisibleNumeral ? "" : "hidden"}`}>
                      <Input type="number" size="sm" label="Agregar numeral" color="primary" variant="faded" />
                      <Textarea name="" id="" cols="30" rows="10" placeholder="Ingresar descripción"></Textarea>
                    </section>
                  </section>
                </section>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="warning" variant="flat" >
                  <i className="fi fi-br-plus"></i>
                  Aplicar
                </Button>
                <section className="w-[13rem] flex justify-between">
                  <Button color="danger" variant="bordered" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="success" variant="flat">
                    <i className="fi fi-br-check"></i>
                    Guardar
                  </Button>
                </section>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <main className="h-screen flex">
        <Sliderbar />
        <section className="w-full h-screen overflow-auto ">
          <section className="grid h-screen grid-cols-2 ">
            <section className="grid place-items-center ">
              <Button size="lg" onPress={onOpen} color="primary" variant="shadow">
                Editar reglamento
              </Button>
            </section>
            <section className="p-[1rem] w-full ">
              <Card className="h-[92vh] flex ">
                <CardBody className="">
                  <Test></Test>
                </CardBody>
              </Card>
            </section>
          </section>

          <Footer />
        </section>
      </main>
    </>
  );
};

export { Rules };
