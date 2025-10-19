const asyncHandler = require('../middleware/asyncHandler')
const productModel = require('../models/products')

// @desc Obtener todos los productos
// @route GET /api/v1/products
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.getAllProducts()
  res.status(200).json({ success: true, count: products.length, data: products })
})

// @desc Obtener un producto
// @route GET /api/v1/products/:id
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.getProductById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' })
  }
  res.status(200).json({ success: true, data: product })
})

exports.createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category_id } = req.body

  // Validaciones básicas
  if (!title || !price || !category_id) {
    return res.status(400).json({
      success: false,
      message: 'title, price y category_id son obligatorios'
    })
  }

  // Conversión segura
  const productData = {
    title: title.trim(),
    description: description?.trim() || '',
    price: Number(price),
    category_id: Number(category_id)
  }

  // Validar que sean numéricos
  if (isNaN(productData.price) || isNaN(productData.category_id)) {
    return res.status(400).json({
      success: false,
      message: 'price y category_id deben ser números'
    })
  }

  const product = await productModel.createProduct(productData)
  res.status(201).json({ success: true, data: product })
})

// @desc Actualizar producto
// @route PUT /api/v1/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  const updated = await productModel.updateProduct(req.params.id, req.body)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product no encontrado' })
  }
  res.status(200).json({ success: true, data: updated })
})

// @desc Borrar producto
// @route DELETE /api/v1/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await productModel.deleteProduct(req.params.id)
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' })
  }
  res.status(200).json({ success: true, data: deleted })
})
