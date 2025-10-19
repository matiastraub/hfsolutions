const pool = require('../config/db')

// Obtener todas las categorias
exports.getAllCategories = async () => {
  const query = `SELECT id, name FROM categories ORDER BY id;`
  const { rows } = await pool.query(query)
  return rows
}

// Crear nueva categoria
exports.createCategory = async (name) => {
  const query = `INSERT INTO categories (name) VALUES ($1) RETURNING *;`
  const { rows } = await pool.query(query, [name])
  return rows[0]
}
