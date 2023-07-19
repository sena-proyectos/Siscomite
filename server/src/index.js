import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', indexRoutes)

app.use((req, res) => {
  res.status(404).send({
    message : 'Este endpoint no se encuentra disponible'
  })
})

app.listen(3000)
console.log('Server running on port 3000')