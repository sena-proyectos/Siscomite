// Importaciones necesarias
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button, Card } from '@nextui-org/react'
import pdfFile from '../../../public/Reglamento-Aprendiz-sena-2023.pdf' // Asegúrate de que la ruta sea correcta

// Configuración de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

// Componente ViewPdf
export const ViewPdf = () => {
  // Estado para almacenar el número total de páginas y la página actual
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  // Manejador de éxito de carga del documento PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  // Función para cambiar de página
  const onPageChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  return (
    // Contenedor principal del componente
    <main className="h-screen flex justify-center items-center">
      {/* Contenedor para mostrar el archivo PDF */}
      <section>
        <Card className={'max-w-full'}>
          <section className="max-h-[80vh] overflow-auto">
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
    </main>
  )
}
