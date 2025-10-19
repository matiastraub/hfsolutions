import { useState, useEffect, useCallback } from 'react'
import { productService } from '../api/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productService.getAll()
      setProducts(data.data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Error fetching products')
    } finally {
      setLoading(false)
    }
  }, [])

  const createProduct = useCallback(async (productData) => {
    try {
      const { data } = await productService.create(productData)
      setProducts((prev) => [data, ...prev])
      return data
    } catch (err) {
      setError(err.message || 'Error creating product')
      throw err
    }
  }, [])

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const { data } = await productService.update(id, productData)
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)))
      return data
    } catch (err) {
      setError(err.message || 'Error updating product')
      throw err
    }
  }, [])

  const deleteProduct = useCallback(async (id) => {
    try {
      await productService.delete(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message || 'Error deleting product')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
