// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getFiles, getSingleFile } from '../../api/httpRequest';

export const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Obtener la lista de archivos subidos
    async function fetchFiles() {
      try {
        const response = await getFiles();
        // Dentro de la función fetchFiles en viewFiles.jsx
        console.log(response.data); // Agrega esta línea
        setFiles(response.data);

        if (Array.isArray(response.data)) { // Verificar si response.data es un array
          setFiles(response.data);
        } else {
          console.error('Error: Datos de archivos no tienen el formato esperado.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de archivos:', error);
      }
    }

    fetchFiles();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleFileSelect = async (nombreArchivo) => {
    try {
      const response = await getSingleFile(nombreArchivo);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      setSelectedFile(url);
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
    }
  };

  return (
    <div>
      <h2>Archivos Subidos</h2>
      <ul>
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <li key={index}>
              <button onClick={() => handleFileSelect(file.nombre_archivo)}>
                {file.nombre_archivo}
              </button>
            </li>
          ))
        ) : (
          <li>No hay archivos disponibles.</li>
        )}
      </ul>
      {selectedFile && (
        <div>
          <h3>Archivo Seleccionado</h3>
          <a href={selectedFile} download={selectedFile}>Descargar Archivo</a>
          <iframe title="Archivo" src={selectedFile} width="100%" height="500"></iframe>
        </div>
      )}
    </div>
  );
};
