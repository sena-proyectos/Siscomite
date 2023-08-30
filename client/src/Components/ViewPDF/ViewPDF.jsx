import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button, Card } from '@nextui-org/react'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

export const ViewPdf = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfFile, setPdfFile] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onPageChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setPdfFile(URL.createObjectURL(file))
    setPageNumber(1)
  }

  return (
    <main className="h-screen flex justify-center items-center ">
      <label className={pdfFile ? 'hidden' : 'cursor-pointer py-[10px] text-[white] items-center bg-indigo-500 text-center px-[25px]  text-[15px] tracking-wide select-none shadow-lg rounded-[10px]  active:transform active:scale-90 transition duration-150 ease-in-out  flex'}>
        <p>Subir reglamento</p>
        <i className="fi fi-rr-folder-upload text-[18px] ml-[10px] " />
        <input className="hidden" type="file" accept="application/pdf" onChange={handleFileChange} />
      </label>
      {pdfFile && (
        <section>
          <Card className="w-full">
            <section className="max-h-[83vh] overflow-auto ">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} className={'document'}>
                <Page pageNumber={pageNumber} />
              </Document>
            </section>
            <p className="text-center">
              Página {pageNumber} de {numPages}
            </p>
            <section className="w-full flex justify-center gap-4 p-4">
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
