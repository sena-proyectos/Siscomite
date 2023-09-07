import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/user.routes.js'
import fichasRoutes from './routes/fichas.routes.js'
import apprenticesRoutes from './routes/apprentices.routes.js'
import articleRoutes from './routes/article.routes.js'
import causeRoutes from './routes/cause.routes.js'
import requestsRoutes from './routes/request.routes.js'
import documentsRoutes from './routes/documents.routes.js'
import modalitiesRouter from './routes/modalities.routes.js'
import ArticleNumberRouter from './routes/articleNumber.routes.js'
import ParagraphRouter from './routes/paragraph.routes.js'
import chapterRouter from './routes/chapter.routes.js'
import fileRouter from './routes/file.routes.js'
import { PORT } from './config.js/'


const app = express()

app.use(cors())
app.use(express.json())

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

app.use((req, res) => {
  res.status(404).send({
    message: 'Este endpoint no se encuentra disponible',
  })
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
