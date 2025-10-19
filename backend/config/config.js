module.exports = {
  apiUrl: '/api/v1',
  limiter: {
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 1000 // Permitir max requests
  },
  allowedOrigins: [
    `http://localhost:3000`,
    `http://localhost:5173`,
    `http://localhost:5174`,
    `http://localhost`
  ]
}
