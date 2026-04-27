import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bookingsRouter from './routes/bookings.js'
import paymentsRouter from './routes/payments.js'
import adminRouter from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 5000

// Stripe webhook needs raw body — must come before json middleware
app.use('/api/bookings/webhook', express.raw({ type: 'application/json' }))

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/bookings', bookingsRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/admin', adminRouter)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error.' })
})

app.listen(PORT, () => {
  console.log(`🚀 CleanBook API running on http://localhost:${PORT}`)
})
