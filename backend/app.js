const express = require('express')
const dotenv = require('dotenv')

const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const config = require('./config/config')

const errorHandler = require('./middleware/error')

// PostgreSQL pool
const pool = require('./config/db')

// Route files
const categoriesRouter = require('./routes/categories')
const productsRouter = require('./routes/products')

const app = express()

//Cargar Variables de entorno
dotenv.config({ path: './.env' })
// Body parser
app.use(express.json())
app.use(cookieParser())

// ✅ PostgreSQL
pool
  .connect()
  .then((client) => {
    console.log('✅ Conectado a PostgreSQL')
    client.release()
  })
  .catch((err) => console.error('❌ PostgreSQL connection failed:', err.stack))

// Habilitar CORS
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: config.allowedOrigins
  })
)

// Seguridad middlewares
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(xss())
app.use(hpp())

const limiter = rateLimit({
  windowMs: config.limiter.windowMs,
  max: config.limiter.max
})

app.use(limiter)

// Public assets
const publicPath = path.join(__dirname, '../public')
app.use('/assets', express.static(publicPath))
app.use(express.static(publicPath))

// Routes
app.use(`${config.apiUrl}/categories`, categoriesRouter)
app.use(`${config.apiUrl}/products`, productsRouter)

// Error handler
app.use(errorHandler)

module.exports = app
