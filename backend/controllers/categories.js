const pool = require('../config/db')
const categoryModel = require('../models/categories')
const asyncHandler = require('../middleware/asyncHandler')

// @desc Obtener todas las categorias
// @route GET /api/v1/category
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.getAllCategories()
  res.status(200).json({ success: true, count: categories.length, data: categories })
})

// @desc Crear nueva categoria
// @route POST /api/v1/category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ success: false, message: 'Category name is required' })
  }

  const category = await categoryModel.createCategory(name)

  res.status(201).json({ success: true, data: category })
})
