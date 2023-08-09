import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/user.routes.js'
import fichasRoutes from './routes/fichas.routes.js'
import apprenticesRoutes from './routes/apprentices.routes.js'
import articleRoutes from './routes/article.routes.js'
import causeRoutes from './routes/cause.routes.js'
import requestsRoutes from './routes/request.routes.js'
import { PORT } from './config.js'


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



app.use((req, res) => {
  res.status(404).send({
    message: 'Este endpoint no se encuentra disponible',
  })
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
