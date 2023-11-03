import multer from 'multer'
import fs from 'fs'

// Directorio donde se guardarán los archivos subidos
const uploadBaseDirectory = 'C:/Archivos_SiscomiteSF'

// Verificar si el directorio existe y crearlo si no
if (!fs.existsSync(uploadBaseDirectory)) {
  fs.mkdirSync(uploadBaseDirectory, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { dataApprentice } = req.body

    const dataApprenticeArray = Array.isArray(dataApprentice) ? dataApprentice : [dataApprentice]

    dataApprenticeArray.forEach((data) => {
      const uploadDirectory = `${uploadBaseDirectory}/${data}`

      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true })
      }

      cb(null, uploadDirectory) // Usar el directorio configurado para cada archivo
    })

    const uploadDownloadDirectory = `${uploadBaseDirectory}/Docs`

    if (!fs.existsSync(uploadDownloadDirectory)) {
      fs.mkdirSync(uploadDownloadDirectory, { recursive: true })
    }
    cb(null, uploadDownloadDirectory)
  },
  filename: (req, file, cb) => {
    // Obtener el tipo de archivo a partir de la extensión del nombre
    const ext = file.originalname.split('.').pop().toLowerCase()
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'docx'] // Agrega las extensiones permitidas
    if (allowedExtensions.includes(ext)) {
      cb(null, Date.now() + '-' + file.originalname)
    } else {
      cb(new Error('Tipo de archivo no permitido'), false)
    }
  }
})

const multerMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true) // Permite todos los archivos por defecto
  }
})

export default multerMiddleware
