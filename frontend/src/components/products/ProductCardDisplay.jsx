import React from 'react'
import { Button } from '../common/Button'
import { RenderStars } from '../common/RenderStars'

export const ProductCard = React.memo(({ product, categoryName, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 border border-gray-100 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {categoryName}
        </span>
      </div>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain rounded-lg my-2"
        />
      )}

      {product.description && <p className="text-sm text-gray-600">{product.description}</p>}

      <div className="flex justify-between text-sm text-gray-700">
        <div>
          <strong className="font-medium">Price:</strong>{' '}
          <span className="text-green-600 font-semibold">${product.price}</span>
        </div>
      </div>

      {/* Rating */}
      {product.rating_rate && (
        <div className="flex items-center gap-2 text-sm">
          <div className="flex">
            <RenderStars rate={product.rating_rate} />
          </div>
          <span className="text-gray-500">({product.rating_count})</span>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button
          variant="edit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </div>
    </div>
  )
})
