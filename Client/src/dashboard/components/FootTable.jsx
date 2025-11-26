import React from "react";

const getFoodTypeInfo = (type) => {
  return type === "veg"
    ? { badge: "bg-green-100 text-green-800", emoji: "🌿" }
    : { badge: "bg-red-100 text-red-800", emoji: "🥩" };
};

const FoodTable = ({ foods, loading, openEditModal }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Food Items ({foods.length})</h2>

      {/* Loading Shimmer */}
      {loading && (
        <div className="animate-pulse space-y-3">
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      )}

      {/* Empty state */}
      {!loading && foods.length === 0 && (
        <p className="text-center text-gray-500 text-lg py-4">
          No items found 🍽️
        </p>
      )}

      {!loading && foods.length > 0 && (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((item) => {
              const { emoji, badge } = getFoodTypeInfo(item.foodType);

              return (
                <tr key={item._id} className="border hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={item.imageFile}
                      alt={item.foodName}
                      className="w-14 h-14 object-cover rounded-lg shadow"
                    />
                  </td>

                  <td className="p-2 border font-semibold text-gray-800">
                    {item.foodName}
                  </td>

                  <td className="p-2 border text-indigo-600 font-bold">
                    ₹{item.price}
                  </td>

                  <td className="p-2 border">
                    <span className={`px-3 py-1 rounded-full text-sm ${badge}`}>
                      {emoji} {item.foodType}
                    </span>
                  </td>

                  <td className="p-2 border text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(item._id)}
                        className="px-3 py-1 text-xs text-white bg-blue-500 rounded-full hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(item._id)}
                        className="px-3 py-1 text-xs text-white bg-red-500 rounded-full hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FoodTable;
