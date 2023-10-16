import React, { useState, useEffect } from 'react'
import { NotifyBadge } from '../Utils/NotifyBadge/NotifyBadge'

import { Footer } from '../Footer/Footer'
import { Sliderbar } from '../Sliderbar/Sliderbar'
import { Button, Input, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Card, CardBody } from '@nextui-org/react'
import { emailFile, getTemplates, templateID } from '../../api/httpRequest'
import { Toaster, toast } from 'sonner'
import { TinyEditor } from '../Utils/tinyEditor/TinyEditor'

const Procedures = () => {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState(null)

  const [templatesName, setTemplatesName] = useState([])
  const [htmlContent, setHtmlContent] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const [selectedKeys, setSelectedKeys] = useState(new Set(['Seleccione una plantilla']))
  const selectedValue = React.useMemo(() => Array.from(selectedKeys).map((key) => key.replace(/_/g, ' ')), [selectedKeys])

  const idTemplate = async (id) => {
    try {
      const result = await templateID(id)
      const data = result.data.result[0].html_content
      setHtmlContent(data)
    } catch (error) {}
  }

  const sendEmailFile = async (id) => {
    const formData = new FormData()
    formData.append('to', email) // Reemplaza con la dirección de correo deseada
    formData.append('subject', 'Prueba de correo con archivo')
    formData.append('text', 'Este correo es una prueba para probar si funciona enviando archivos')
    formData.append('html', htmlContent)
    formData.append('file', file)

    try {
      const response = await emailFile(formData)
      const res = response.data.message

      toast.success('Genial!!', {
        description: res
      })
    } catch (error) {
      const message = error.response.data.message
      toast.error('Opss!!', {
        description: message
      })
    }
  }

  useEffect(() => {
    const templatesGet = async () => {
      try {
        const response = await getTemplates()
        const res = response.data.result
        setTemplatesName(res)
      } catch (error) {
        toast.error('¡Opss!', {
          description: 'Error al obtener las plantillas'
        })
      }
    }

    templatesGet()
  }, [])

  return (
    <main className="flex h-secreen">
      <Sliderbar />
      <Toaster position="top-right" closeButton richColors />
      <section className="w-full overflow-auto">
        <header className="w-full flex right-0 relative ">
          <section className="absolute right-[20%] flex justify-center top-[2rem]">
            <NotifyBadge />
          </section>
        </header>
        <section className="h-[85vh] grid grid-cols-2 gap-1">
          <section className="w-full flex flex-col justify-center gap-5  p-20">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="capitalize" color="primary">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Single selection actions" variant="flat" disallowEmptySelection selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                {templatesName.map((item) => (
                  <DropdownItem key={item.nombre_plantilla} onClick={() => idTemplate(item.id_plantilla)}>
                    {item.nombre_plantilla}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <label htmlFor="upload" className="w-full flex flex-col items-center justify-center gap-2 p-10 cursor-pointer bg-white rounded-md border border-blue-600 shadow-md">
              <i className="fi fi-rr-add-document text-blue-600 text-3xl" />
              <span className="text-gray-600 font-se">{file ? `Archivo seleccionado: ${file.name}` : 'Subir archivo'}</span>
            </label>
            <input id="upload" type="file" className="hidden" onChange={handleFileChange} />

            <Input isRequired type="email" label="Agregar email" labelPlacement="outside" className="w-full mt-[1rem]" onChange={(e) => setEmail(e.target.value)} />
            <Button color="primary" variant="shadow" onClick={sendEmailFile}>
              Enviar
            </Button>
          </section>
          <section className="h-full grid mt-[3rem] place-items-center">
            {/* <Card>
              <CardBody>
                <div dangerouslySetInnerHTML={{ __html: htmlContent ? htmlContent : 'Seleccione una plantilla para visualizarla' }} />
              </CardBody>
            </Card> */}
            <TinyEditor template={!htmlContent ? '<h2><strong>Seleccione una plantilla y podrás visualizarla aquí.</strong></h2>' : htmlContent} onContentChange={setHtmlContent}/>
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}

export { Procedures }
