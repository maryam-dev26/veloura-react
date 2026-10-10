import path from 'path'
import { fileURLToPath } from 'url'
import productRoutes from './routes/productRoutes.js'
import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const app = express()

app.use(cors({
    origin: env.CORS_ORIGIN || 'http://localhost:5173'
}))
app.use(express.json())

app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.static(path.join(__dirname, '../../dist')))

app.use('/api/products', productRoutes)
