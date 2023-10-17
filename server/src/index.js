// Importar las bibliotecas necesarias
import express from 'express' // Framework web Express
import cors from 'cors' // Middleware para manejar CORS (Cross-Origin Resource Sharing)
import indexRoutes from './routes/index.routes.js' // Rutas para el índice
import userRoutes from './routes/user.routes.js' // Rutas relacionadas con los usuarios
import fichasRoutes from './routes/fichas.routes.js' // Rutas relacionadas con las fichas
import apprenticesRoutes from './routes/apprentices.routes.js' // Rutas relacionadas con los aprendices
import articleRoutes from './routes/article.routes.js' // Rutas relacionadas con los artículos
import causeRoutes from './routes/cause.routes.js' // Rutas relacionadas con las causas
import requestsRoutes from './routes/request.routes.js' // Rutas relacionadas con las solicitudes
import documentsRoutes from './routes/documents.routes.js' // Rutas relacionadas con los documentos
import modalitiesRouter from './routes/modalities.routes.js' // Rutas relacionadas con las modalidades
import ArticleNumberRouter from './routes/articleNumber.routes.js' // Rutas relacionadas con los números de artículo
import ParagraphRouter from './routes/paragraph.routes.js' // Rutas relacionadas con los párrafos
import chapterRouter from './routes/chapter.routes.js' // Rutas relacionadas con los capítulos
import fileRouter from './routes/file.routes.js' // Rutas relacionadas con los archivos
import notifyRouter from './routes/notify.routes.js' // Rutas relacionadas con los archivos
import sendEmail from './routes/sendMail.routes.js'
import templateRoute from './routes/template.routes.js'
import { PORT } from './config.js' // Importar el puerto desde la configuración
import rulesRoute from './routes/rules.routes.js'
import http from 'http'
import {Server} from 'socket.io'

const app = express() // Crear una instancia de la aplicación Express
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.use(cors()); // Configurar el middleware CORS para manejar las solicitudes de origen cruzado
app.use(express.json()) // Habilitar el análisis del cuerpo de solicitud JSON

io.on('connection', (socket) => {
  socket.emit('nerf', 'Nerfeen a chamber')
  socket.on('message', () => {
    console.log('HOLAA')
  })
})

server.listen(3010)


// Configurar las rutas para diferentes partes de la aplicación
app.use(indexRoutes)
app.use('/api', userRoutes)
app.use('/api', fichasRoutes)
app.use('/api', articleRoutes)
app.use('/api', causeRoutes)
app.use('/api', apprenticesRoutes)
app.use('/api', requestsRoutes)
app.use('/api', documentsRoutes)
app.use('/api', modalitiesRouter)
app.use('/api', chapterRouter)
app.use('/api', ArticleNumberRouter)
app.use('/api', ParagraphRouter)  
app.use('/api', fileRouter)
app.use('/api', notifyRouter)
app.use('/api', sendEmail)
app.use('/api', templateRoute)
app.use('/api', rulesRoute)

// Configurar un manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send({
    message: 'Este endpoint no se encuentra disponible'
  })
})

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
