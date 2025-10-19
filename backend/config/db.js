require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
})

pool
  .connect()
  .then(() => console.log(`✅ Conectado con PostgreSQL: ${process.env.PG_DATABASE}`))
  .catch((err) => console.error('❌ PostgreSQL error de conexion:', err))

module.exports = pool
