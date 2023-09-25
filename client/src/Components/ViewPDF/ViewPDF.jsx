// Importaciones necesarias
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button, Card } from '@nextui-org/react'

// Configuración de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

// Componente ViewPdf
export const ViewPdf = () => {
  // Estado para almacenar el número total de páginas y la página actual
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  // Estado para almacenar el archivo PDF
  const [pdfFile, setPdfFile] = useState(null)

  // Manejador de éxito de carga del documento PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  // Función para cambiar de página
  const onPageChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  // Función para manejar el cambio de archivo PDF
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setPdfFile(URL.createObjectURL(file))
    setPageNumber(1) // Reiniciar la página actual cuando se carga un nuevo archivo
  }

  return (
    // Contenedor principal del componente
    <main className="h-screen flex justify-center items-center ">
      {/* Botón para cargar un archivo PDF */}
      <label className={pdfFile ? 'hidden' : 'cursor-pointer py-[10px] text-[white] items-center bg-indigo-500 text-center px-[25px]  text-[15px] tracking-wide select-none shadow-lg rounded-[10px]  active:transform active:scale-90 transition duration-150 ease-in-out  flex'}>
        <p>Subir reglamento</p>
        <i className="fi fi-rr-folder-upload text-[18px] ml-[10px] " />
        <input className="hidden" type="file" accept="application/pdf" onChange={handleFileChange} />
      </label>

      {/* Contenedor para mostrar el archivo PDF */}
      {pdfFile && (
        <section>
          <Card className={'max-w-full'}>
            <section className="max-h-[80vh] overflow-auto ">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} className={'document'}>
                <Page pageNumber={pageNumber} />
              </Document>
            </section>
            <p className="text-center">
              Página {pageNumber} de {numPages}
            </p>
            <section className="w-full flex justify-center gap-4 p-4">
              {/* Botones para navegar entre páginas */}
              <Button color="primary" variant="ghost" onClick={() => onPageChange(pageNumber - 1)} disabled={pageNumber <= 1}>
                Página anterior
              </Button>
              <Button color="primary" variant="ghost" onClick={() => onPageChange(pageNumber + 1)} disabled={pageNumber >= numPages}>
                Página siguiente
              </Button>
            </section>
          </Card>
        </section>
      )}
    </main>
  )
}
