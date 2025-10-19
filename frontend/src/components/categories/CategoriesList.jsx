import { Button } from '../common/Button'

export const CategoriesList = ({ categories }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-gray-800">{cat.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
