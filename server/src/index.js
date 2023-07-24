import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/user.routes.js'

import { PORT } from './config.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use('/api', userRoutes)

app.use((req, res) => {
  res.status(404).send({
    message : 'Este endpoint no se encuentra disponible'
  })
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)