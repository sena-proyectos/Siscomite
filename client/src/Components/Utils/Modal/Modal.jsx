import './Modal.css'
import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '@nextui-org/react'

export const Modal = ({ cerrarModal, titulo, modalAdd = false, modalInfo = false, modalAddGroups = false }) => {
  const closeModal = () => {
    cerrarModal()
  }

  const [isTrimestreEnabled, setIsTrimestreEnabled] = useState(false)

  const handleEtapaChange = (event) => {
    const selectedValue = event.target.value
    setIsTrimestreEnabled(selectedValue === 'lectiva')
  }

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['text']))

  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys])

  return (
    <>
      <main className="fondo">
        <section className="containerModal">
          <header className="headerModal">
            <h3>{titulo}</h3>
            <i className="fi fi-br-cross relative left-[25%]" onClick={closeModal} />
          </header>
          <section className="bodyModal">
            {modalAdd && (
              <section className="w-full h-[60vh] relative top-2 overflow-hidden">
                <section className="relative flex flex-wrap justify-center gap-x-7 top-8 gap-y-8 ">
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Nombre" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Apellido" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section>
                    <select className="bg-[#2e323e54] px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10 outline-none">
                      <option value="">Tipo de documento</option>
                      <option value="">CC</option>
                      <option value="">TI</option>
                      <option value="">PE</option>
                    </select>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Documento" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Correo Institucional" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Correo alterno" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número alterno" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                </section>
                <section className="modalArchivo">
                  <section className="modalInput">
                    <label className="labelArchivo">
                      <i class="fi fi-rr-folder-upload" id="iconArchivo" />
                      Subir Excel
                      <input type="file" name="archivo" id="inputArchivo" required />
                    </label>
                  </section>
                  <section className="enviar">
                    <Button icon={<i className="fi fi-br-check" id="iconSave" />} title={'Guardar'} />
                  </section>
                </section>
              </section>
            )}

            {modalInfo && (
              <section className="modalInfo">
                <section className="contentInfo">
                  <section className="info">
                    <span className="infoTitle">Nombre completo</span>
                    <p className="infoText">Mariana Lopez Robledo Estrada</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Tipo de documento</span>
                    <p className="infoText">Cédula de ciudadanía</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número de documento</span>
                    <p className="infoText">12345678</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Correo institucional</span>
                    <p className="infoText">mariana34@soy.sena.edu.co</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Correo Alterno</span>
                    <p className="infoText">marinalopez@gmail.com</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número</span>
                    <p className="infoText">3245555555</p>
                  </section>
                  <section className="info">
                    <span className="infoTitle">Número alteno</span>
                    <p className="infoText">6666666</p>
                  </section>
                </section>
              </section>
            )}

            {modalAddGroups && (
              <section className="modalGrup ">
                <section className="relative flex flex-wrap justify-center top-5 gap-x-7 gap-y-6">
                  <section className="modalInput ">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Número de ficha" labelPlacement={'outside'} variant={'flat'} />
                    </div>
                  </section>
                  <section className="modalInput">
                    <div className="flex flex-wrap items-end w-full gap-4 mb-6 inputContent md:flex-nowrap md:mb-0">
                      <Input size="md" type="text" label="Nombre del programa" labelPlacement={'outside'} variant={'bordered'} />
                    </div>
                  </section>
                  <section>
                    <select className="bg-[#2e323e54] px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10 outline-none">
                      <option value="">Jornada</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                      <option value="Noche">Fines de semana</option>
                      <option value="Noche">Virtual</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-[#2e323e54]  px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required onChange={handleEtapaChange}>
                      <option value="">Etapa</option>
                      <option value="lectiva">Lectiva</option>
                      <option value="practica">Práctica</option>
                    </select>
                  </section>
                  <section>
                    <select className="bg-[#2e323e54] px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required disabled={!isTrimestreEnabled}>
                      <option value="">Trimestre lectivo</option>
                      <option value="lectiva">1</option>
                      <option value="practica">2</option>
                      <option value="practica">3</option>
                      <option value="practica">4</option>
                      <option value="practica">5</option>
                      <option value="practica">6</option>
                    </select>
                  </section>
                  <select className="bg-[#2e323e54]  px-[12px] shadow-sm w-[11rem] text-small gap-3 rounded-medium h-unit-10" required>
                    <option value="">Modalidad</option>
                    <option value="vitual">Vitual</option>
                    <option value="presencial">Presencial</option>
                    <option value="media_tecnica">Media Técnica</option>
                    <option value="distancia">A distancia</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </section>
                <section className="enviarGroup relative top-[2rem] fl justify-center">
                  <Button icon={<i className="fi fi-br-check" id="iconSave" />} title={'Guardar'} />
                </section>
              </section>
            )}
          </section>
        </section>
      </main>
    </>
  )
}
