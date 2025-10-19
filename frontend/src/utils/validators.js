export const validators = {
  /**
   * Validar datos de un producto
   * @param {Object} product - Objeto producto a validar
   * @returns {Object} errors - Claves son nombres de campo, valores son mensajes de error
   */
  validateProduct: (product) => {
    const errors = {}
    if (!product.title || product.title.trim() === '') {
      errors.title = 'El título es obligatorio'
    }

    if (!product.description || product.description.trim() === '') {
      errors.description = 'La descripción es obligatoria'
    }

    if (product.price === '' || product.price === null || isNaN(Number(product.price))) {
      errors.price = 'Se requiere un precio válido'
    } else if (Number(product.price) <= 0) {
      errors.price = 'El precio no puede ser cero o  negativo'
    }

    if (!product.category_id || isNaN(Number(product.category_id))) {
      errors.category_id = 'Se requiere una categoría válida'
    }

    return errors
  },

  /**
   * Validar datos de una categoría
   * @param {Object} category
   * @returns {Object} errors
   */
  validateCategory: (category) => {
    const errors = {}
    if (!category.name || category.name.trim() === '') {
      errors.name = 'El nombre de la categoría es obligatorio'
    }
    return errors
  }
}
