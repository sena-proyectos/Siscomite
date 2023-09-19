import  { useState, useEffect } from 'react';
import { uploadFile, getFiles, getSingleFile } from '../../api/httpRequest';

export const Test = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
const [files, setFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  useEffect(() => {
    // Obtener la lista de archivos subidos al cargar el componente
   const fetchFiles = async () => {
  try {
    const response = await getFiles();
    console.log(response.data); // Agrega esto para verificar los datos obtenidos
    setFiles(response.data);
  } catch (error) {
    console.error('Error al obtener la lista de archivos:', error);
  }
};


    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', selectedFile);
    
    try {
      const response = await uploadFile(formData);
      
      if (response.status === 201) {
        setUploadStatus('Archivo subido exitosamente.');
        // Actualizar la lista de archivos después de subir uno nuevo
        const updatedFiles = await getFiles();
        setFiles(updatedFiles.data);
      } else {
        setUploadStatus('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    setUploadStatus('Error al subir el archivo.');
    }
  };

const handleFileSelect = async (nombre_archivo) => {
    try {
      const response = await getSingleFile(nombre_archivo);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      setSelectedFileUrl(url);
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
    }
  };

  return (
    <div>
      <h2>Subir Archivo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Subir Archivo</button>
      <p>{uploadStatus}</p>

  <h2>Archivos Subidos</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <button onClick={() => handleFileSelect(file.nombre_archivo)}>
              {file.nombre_archivo}
            </button>
          </li>
        ))}
      </ul>
      {selectedFileUrl && (
        <div>
          <h3>Archivo Seleccionado</h3>
          <a href={selectedFileUrl} target="_blank" rel="noopener noreferrer">
            Ver/Descargar Archivo
          </a>
        </div>
      )}
    </div>
  );
};
