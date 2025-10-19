import { useForm } from '../../hooks/useForm'
import { validators } from '../../utils/validators'
import { FormField } from './FormField'
import { Button } from '../common/Button'
import { Alert } from '../common/Alert'

export const CategoryForm = ({ category, onSubmit, onCancel, onSuccess }) => {
  const initialValues = category || {
    name: ''
  }

  const { formData, handleChange, handleSubmit, errors, isSubmitting } = useForm(
    initialValues,
    async (data) => {
      const validationErrors = validators.validateCategory(data)
      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Rellenar campos obligatorios')
      }

      const result = await onSubmit(data)
      if (onSuccess) {
        onSuccess(result, !!category)
      }
    }
  )

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {errors.submit && <Alert type="error" message={errors.submit} />}

      <FormField
        label="Nombre categoría"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <div className="flex gap-3 justify-end pt-2 border-t border-gray-200">
        <Button
          type="submit"
          variant="success"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          {isSubmitting ? 'Saving...' : category ? '💾 Actualizar' : '✓ Añadir'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition font-medium"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
