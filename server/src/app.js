import productRoutes from './routes/productRoutes.js'
import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'


export const app = express()

app.use(cors({
    origin: env.CORS_ORIGIN || 'http://localhost:5173'
}))
app.use(express.json())


app.use('/api/products', productRoutes)
