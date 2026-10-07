import productRoutes from './routes/productRoutes.js'
import express from 'express'
import cors from 'cors'

export const app = express()

app.use('/api/products', productRoutes)
app.use(cors())
app.use(express.json())

