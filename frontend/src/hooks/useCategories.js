import { useState, useEffect, useCallback } from 'react'
import { categoryService } from '../api/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await categoryService.getAll()
      setCategories(data.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createCategory = useCallback(async (data) => {
    try {
      const resp = await categoryService.create(data)
      setCategories((prev) => [resp.data, ...prev])
      return data
    } catch (err) {
      setError(err.message || 'Error creating product')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, fetchCategories, createCategory }
}
