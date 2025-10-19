const pool = require('../config/db')

exports.getAllProducts = async () => {
  const query = `
    SELECT 
      p.id, p.title, p.price, p.description, p.image, 
      p.rate AS rating_rate, 
      p.count AS rating_count,
      c.id AS category_id,
      c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
    ORDER BY p.id;
  `
  const { rows } = await pool.query(query)
  return rows
}

exports.getProductById = async (id) => {
  const query = `
    SELECT 
      p.id, p.title, p.price, p.description, p.image, 
      p.rate AS rating_rate, 
      p.count AS rating_count,
      c.id AS category_id,
      c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1;
  `
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

exports.createProduct = async (product) => {
  const { title, price, description, image, rate, count, category_id } = product
  const query = `
    INSERT INTO products (title, price, description, image, rate, count, category_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, title, price, description, image, rate AS rating_rate, count AS rating_count, category_id;
  `
  const values = [title, price, description, image, rate, count, category_id]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

exports.updateProduct = async (id, product) => {
  const { title, price, description, image, rate, count, category_id } = product
  const query = `
    UPDATE products
    SET title = $1, price = $2, description = $3, image = $4, rate = $5, count = $6, category_id = $7
    WHERE id = $8
    RETURNING *;
  `
  const values = [title, price, description, image, rate, count, category_id, id]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

exports.deleteProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = $1 RETURNING *;`
  const { rows } = await pool.query(query, [id])
  return rows[0]
}
