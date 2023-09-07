import React from "react";
import { Sliderbar } from "../Sliderbar/Sliderbar";
import { Footer } from "../Footer/Footer";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";

const Setting = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [showOldPassword, setShowOldPassword] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  return (
    <main className="h-screen flex">
      <Sliderbar />
      <section className="w-full  overflow-auto">
        <section className="h-screen grid place-items-center grid-cols-2 gap-4">
          <section className="p-[1rem] w-full">
            <Card className=" h-full overflow-auto">
              <CardHeader className="flex items-center gap-3">
                <i className="fi fi-rr-settings text-[2.5rem]"></i>
                <section className="flex flex-col">
                  <p className="text-md">Angie Tatiana Mosquera Arco</p>
                  <p className="text-small text-default-500">atmosquera45@misena.edu.co</p>
                </section>
              </CardHeader>
              <Divider className="bg-blue-500" />
              <CardBody>
                <h3 className="font-bold">Seguridad de cuenta</h3>
                <Input label="Email institucional" type="email" variant="underlined" defaultValue="atmosquera45@misena.edu.co" />
                <Input label="Email personal" type="email" variant="underlined" defaultValue="atatianamosquera@gmail.com" />
                <Input label="Número de contacto" type="number" variant="underlined" defaultValue="3014291038" />
                <section className="mt-[1rem]">
                  <Button color="primary" variant="flat" className=" w-[10rem]">
                    Guardar cambios <i className="fi fi-br-check" />
                  </Button>
                </section>
              </CardBody>
              <Divider className="bg-blue-500" />
              <CardFooter className="block">
                <h3 className="font-bold">Cambiar contraseña</h3>
                <Input
                  label="Antigua contraseña"
                  variant="underlined"
                  placeholder="Ingresa tu antigua contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleShowOldPassword}>
                      {showOldPassword ? <i className="fi fi-rr-eye-crossed" /> : <i className="fi fi-rr-eye" />}
                    </button>
                  }
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  label="Nueva contraseña"
                  variant="underlined"
                  placeholder="Ingresa tu nueva contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleShowNewPassword}>
                      {showNewPassword ? <i className="fi fi-rr-eye-crossed" /> : <i className="fi fi-rr-eye" />}
                    </button>
                  }
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button color="primary" variant="flat" className="my-[1rem]">
                  Cambiar contraseña <i className="fi fi-sr-shuffle text-lg" />
                </Button>
              </CardFooter>
            </Card>
          </section>
          
        </section>
        <Footer />
      </section>
    </main>
  );
};

export { Setting };
