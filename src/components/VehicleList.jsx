// src/components/VehicleList.jsx
export default function VehicleList({ models, makeName }) {
    return (
      <div>
        {/* Используем makeName для заголовка */}
        <h2 className="text-2xl font-bold mb-4">{makeName}</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b-2 border-gray-200">Model ID</th>
              <th className="text-left py-2 px-4 border-b-2 border-gray-200">Model Name</th>
            </tr>
          </thead>
          <tbody>
            {models.length > 0 ? (
              models.map((model) => (
                <tr key={model.Model_ID} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200">{model.Model_ID}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{model.Model_Name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-2 px-4 text-center">No models found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  