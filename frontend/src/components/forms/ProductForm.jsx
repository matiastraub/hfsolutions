import { useForm } from '../../hooks/useForm'
import { validators } from '../../utils/validators'
import { Button } from '../common/Button'
import { FormField } from './FormField'
import { Alert } from '../common/Alert'

export const ProductForm = ({ categories, product, onSubmit, onCancel, onSuccess }) => {
  const initialValues = product || {
    title: '',
    description: '',
    price: 0,
    category_id: 0
  }

  const { formData, handleChange, handleSubmit, errors, isSubmitting } = useForm(
    initialValues,
    async (data) => {
      const validationErrors = validators.validateProduct(data)
      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Rellenar campos obligatorios')
      }

      // Llamar a la función de creación o actualización
      const result = await onSubmit(data)

      // Llamar a onSuccess si se pasó
      if (onSuccess) {
        onSuccess(result, !!product)
      }
    }
  )

  return (
    <form
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {product ? 'Editar Producto' : 'Añadir producto'}
      </h2>

      {errors.submit && <Alert type="error" message={errors.submit} />}

      <FormField
        label="Título"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <FormField
        label="Descripcion"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      <FormField
        label="Precio"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        min="0"
        error={errors.price}
        required
      />

      <FormField
        label="Categoría"
        name="category_id"
        type="select"
        value={formData.category_id}
        onChange={handleChange}
        options={categories.map((c) => ({ value: c.id, label: c.name }))}
        error={errors.category_id}
        required
      />

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          variant="success"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          {isSubmitting ? 'Saving...' : product ? '💾 Actualizar' : '✓ Añadir'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition font-medium"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
