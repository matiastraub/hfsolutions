import React, { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { CategoryForm } from '../components/forms/CategoryForm'
import { Modal } from '../components/common/Modal'
import { Button } from '../components/common/Button'
import { Alert } from '../components/common/Alert'
import { CategoriesList } from '../components/categories/CategoriesList'
import Swal from 'sweetalert2'

export const CategoriesPage = () => {
  const { categories, createCategory, error } = useCategories()
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const handleAdd = () => {
    setEditingCategory(null)
    setShowForm(true)
  }

  const handleFormSuccess = (product, isUpdate = false) => {
    // Cerrar modal
    setShowForm(false)
    setEditingCategory(null)

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: isUpdate ? 'Categoria actualizado' : 'Categoria añadida',
      text: `La categoría ha sido ${isUpdate ? 'actualizada' : 'creada'} correctamente`,
      timer: 2000,
      showConfirmButton: false
    })
  }

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} />}

      {/* Botón de añadir categoría */}
      <div className="flex justify-end">
        <Button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Añadir Categoría
        </Button>
      </div>

      {/* Tabla de categorías */}
      <CategoriesList categories={categories} />

      {/* Modal para añadir/editar */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingCategory ? 'Editar Categoría' : 'Añadir Categoría'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={createCategory}
          onCancel={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      </Modal>
    </div>
  )
}
