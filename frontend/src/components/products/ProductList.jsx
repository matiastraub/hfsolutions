import React from 'react'
import { Spinner } from '../common/Spinner'
import { Button } from '../common/Button'
import Swal from 'sweetalert2'

export const ProductList = React.memo(
  ({ products, categories, loading, onEdit, onDelete, onShowProduct }) => {
    const getCategoryName = (categoryId) =>
      categories.find((c) => c.id === categoryId)?.name || 'Desconocido'

    const onDeleteProduct = async (productId) => {
      const result = await Swal.fire({
        title: 'Eliminar Producto',
        text: `¿Estás seguro de eliminar este producto?`,
        icon: 'warning',
        dangerMode: true,
        showCancelButton: true,
        confirmButtonText: 'Si, eliminarlo',
        closeOnConfirm: false
      })

      if (result.isConfirmed) {
        onDelete(productId)
      }
    }

    if (loading) return <Spinner />

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Productos</h2>
        </div>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-6 italic">
            No se encontraron productos. ¡Crea uno para comenzar!
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{p.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {getCategoryName(p.category_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
                      <Button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onShowProduct(p)}
                      >
                        🔍 Mostrar
                      </Button>
                      <Button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onEdit(p)}
                      >
                        ✎ Editar
                      </Button>
                      <Button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDeleteProduct(p?.id)}
                      >
                        🗑 Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
)
