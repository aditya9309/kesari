import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from './config/config.js'
import contactRoutes from './routes/contactRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: false, limit: '100kb' }))

app.use(cors({
  origin(origin, callback) {
    if (!origin || config.allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Origin is not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}))

app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }))
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Kesari Associates Backend is running'
  })
})
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'kesari-associates-api' }))
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)

app.use((req, res) => res.status(404).json({ message: 'API route not found' }))
app.use((error, req, res, next) => {
  const status = error.status || (error.message === 'Origin is not allowed by CORS' ? 403 : 500)
  res.status(status).json({ message: status === 500 ? 'An unexpected server error occurred.' : error.message })
})
export default app
