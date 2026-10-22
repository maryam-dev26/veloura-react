import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'


export const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174',
        env.CORS_ORIGIN].filter(Boolean)
}))
app.use(express.json())
app.use('/api/auth', authRoutes)

app.use('/api/products', productRoutes)
