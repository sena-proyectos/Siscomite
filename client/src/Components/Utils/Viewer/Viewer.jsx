import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export const Viewer = ({ pdfUrl }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

 
