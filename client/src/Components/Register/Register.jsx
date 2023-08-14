import "./Register.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useRef } from "react";
import { register } from "../../api/httpRequest";
import { Toast } from "../toast/toast";
import { Footer } from "../Footer/Footer";
import { Input } from "@nextui-org/react";
import Image from "../../assets/image/logoSena.png";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const Register = () => {
  const nombres = useRef();
  const apellidos = useRef();
  const email_sena = useRef();
  const numero_celular = useRef();
  const id_documento = useRef();
  const numero_documento = useRef();
  const contrasena = useRef();

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const sendData = async (e) => {
    e.preventDefault();
    const dataValue = {
      nombres: nombres.current.value,
      apellidos: apellidos.current.value,
      email_sena: email_sena.current.value,
      numero_celular: numero_celular.current.value,
      id_documento: id_documento.current.value,
      numero_documento: numero_documento.current.value,
      contrasena: contrasena.current.value,
    };

    try {
      const res = await register(dataValue);
      const response = res.data.message;
      setMessage(response);
    } catch (error) {
      const message = error.response.data.message;
      setError(message);
    }
  };

  const closed = () => {
    setError(null);
    setMessage(null);
  };

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Tipo documento"]));
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="h-screen">
          {error && <Toast message={error} typeToast="warnning" onClose={closed} />}
          {message && <Toast message={message} typeToast="success" onClose={closed} />}
      <section className="absolute top-11 left-11" style={{ animation: "show 0.8s ease-in-out" }}>
        <img src={Image} alt="Sena" className="w-[4rem]" />
      </section>
      <section className="flex items-center justify-center w-full h-screen" style={{ animation: "show 0.8s ease-in-out" }}>
        <form className="relative grid p-4 rounded-xl bg-white shadow-md text-center place-items-center " onSubmit={sendData}>
          <h2 className="font-semibold text-[1.5rem]">Crear una cuenta</h2>
          <section className="relative w-[90%] top-[1rem] grid gap-8  ">
            <section className="w-full flex justify-between gap-2">
              <div className="flex flex-wrap items-end w-full gap-4 mb-6 p md:flex-nowrap md:mb-0">
                <Input type="text" label="Nombre" labelPlacement={"outside"} autoComplete="off" ref={nombres} />
              </div>

              <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                <Input type="text" label="Apellido" labelPlacement={"outside"} autoComplete="off" ref={apellidos} />
              </div>
            </section>

            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input type="email" label="Correo institucional" labelPlacement={"outside"} autoComplete="off" ref={email_sena} />
            </div>
            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input type="text" label="Teléfono" labelPlacement={"outside"} autoComplete="off" ref={numero_celular} />
            </div>

            <section className="w-full flex justify-between gap-2 ">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-full gap-4 capitalize " ref={id_documento}>
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                  <DropdownItem key="C.C">C.C</DropdownItem>
                  <DropdownItem key="T.I">T.I</DropdownItem>
                  <DropdownItem key="C.E">C.E</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                <Input type="text" label="Documento" labelPlacement={"outside"} autoComplete="off" ref={numero_documento} />
              </div>
            </section>

            <div className="flex flex-wrap items-end w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
              <Input
                label="Contraseña"
                labelPlacement={"outside"}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <i className="fi fi-rs-crossed-eye"></i> : <i className="fi fi-rr-eye"></i>}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
                autoComplete="off"
                ref={contrasena}
              />
            </div>

            <button className="bg-[#3c3c3c] text-white w-full cursor-pointer rounded-md font-light text-xs py-3">Registrate</button>
            <p className="text-sm top-[-1rem] relative">
              ¿Ya estas registrado?{" "}
              <Link className="text-sm text-[#587fff]" to={"/"}>
                Iniciar sesión
              </Link>
            </p>
          </section>
        </form>
      </section>
        <Footer />
    </main>
  );
};
