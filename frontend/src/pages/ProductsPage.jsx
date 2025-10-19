import React, { useState, useMemo, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { ProductList } from '../components/products/ProductList'
import { ProductForm } from '../components/forms/ProductForm'
import { Modal } from '../components/common/Modal'
import { Button } from '../components/common/Button'
import { Alert } from '../components/common/Alert'
import { Spinner } from '../components/common/Spinner'
import { ProductCard } from '../components/products/ProductCardDisplay'
import Swal from 'sweetalert2'

export const ProductsPage = () => {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()
  const { categories } = useCategories()

  const [showForm, setShowForm] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showProduct, setShowProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [filterName, setFilterName] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Callbacks memoizados
  const handleAddNew = useCallback(() => {
    setEditingProduct(null)
    setShowForm(true)
  }, [])

  const handleEdit = useCallback((product) => {
    setEditingProduct(product)
    setShowForm(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowForm(false)
    setEditingProduct(null)
  }, [])

  const categoryOptions = useMemo(() => {
    return categories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))
  }, [categories])

  const filteredProductsWithCategory = useMemo(() => {
    const filteredProducts = (products || []).filter((p) => {
      const name = p.title || ''
      const matchesName = name.toLowerCase().includes(filterName.toLowerCase())
      const matchesCategory = !filterCategory || String(p.category_id) === String(filterCategory)
      return matchesName && matchesCategory
    })
    //Se mapea con las categorias

    const fpNew = filteredProducts.map((p) => ({
      ...p,
      categoryName: categories.find((c) => c.id === p.category_id)?.name || 'Desconocido'
    }))

    return fpNew
  }, [products, filterName, filterCategory, categories])

  const handleFormSuccess = (product, isUpdate = false) => {
    // Cerrar modal
    setShowForm(false)
    setEditingProduct(null)

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: isUpdate ? 'Producto actualizado' : 'Producto añadido',
      text: `${product.title} ha sido ${isUpdate ? 'actualizado' : 'creado'} correctamente`,
      timer: 2000,
      showConfirmButton: false
    })
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId)

      // Mostramos SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: `El producto ha sido eliminado correctamente`,
        timer: 2000,
        showConfirmButton: false
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'No se pudo eliminar el producto'
      })
    }
  }

  const handleShowProduct = (product) => {
    setShowProduct(product)
    setShowCard(true)
  }

  const onCloseCard = () => {
    setShowCard(false)
  }

  const getCategoryName = (categoryId) =>
    categories.find((c) => c.id === categoryId)?.name || 'Desconocido'

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {error && <Alert type="error" message={error} />}

      {/* Botón de añadir producto */}
      <div className="flex justify-end">
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Añadir Producto
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Todas las categorías</option>
          {categoryOptions}
        </select>
      </div>

      {/* Lista de productos */}
      {filteredProductsWithCategory.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos que coincidan con los filtros.</p>
      ) : (
        <ProductList
          products={filteredProductsWithCategory}
          categories={categories}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
          onShowProduct={handleShowProduct}
        />
      )}
      {/* Modal Card */}
      <Modal isOpen={showCard} onClose={onCloseCard}>
        <ProductCard
          key={showProduct?.id}
          product={showProduct}
          categoryName={getCategoryName(showProduct?.category_id)}
          onClose={onCloseCard}
        />
      </Modal>
      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={handleCloseModal}
        title={editingProduct ? 'Editar Producto' : 'Añadir Producto'}
      >
        <ProductForm
          categories={categories}
          product={editingProduct}
          onSubmit={
            editingProduct ? (data) => updateProduct(editingProduct.id, data) : createProduct
          }
          onCancel={handleCloseModal}
          onSuccess={handleFormSuccess}
        />
      </Modal>
    </div>
  )
}
