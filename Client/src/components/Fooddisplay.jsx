import React from "react";

// Constant: Sample food data
const sampleFoodItems = [
  {
    id: 1,
    name: "Avocado Toast Deluxe",
    type: "veg",
    meal: "Breakfast",
    category: "Brunch",
    price: 12.5,
    imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=Veg",
  },
  {
    id: 2,
    name: "Spicy Grilled Steak",
    type: "non-veg",
    meal: "Dinner",
    category: "Red Meat",
    price: 34.99,
    imageUrl: "https://placehold.co/100x100/F08080/000?text=Non-Veg",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    type: "veg",
    meal: "Dessert",
    category: "Bakery",
    price: 9.0,
    imageUrl: "https://placehold.co/100x100/E5A8E5/000?text=Sweet",
  },
];

// Utility: Badge color + emoji
const getFoodTypeInfo = (type) => {
  if (type === "veg") {
    return {
      badge: "bg-green-100 text-green-800",
      emoji: "🌿",
    };
  }
  return {
    badge: "bg-red-100 text-red-800",
    emoji: "🥩",
  };
};

// Main Component
const Fooddisplay = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl h-full overflow-y-auto">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Food Item Dashboard ({sampleFoodItems.length} Items)
      </h2>

      <div className="space-y-4">
        {sampleFoodItems.map((item) => {
          const { badge, emoji } = getFoodTypeInfo(item.type);

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 
              p-4 rounded-xl shadow-md transition duration-200 hover:shadow-lg hover:bg-white 
              border border-gray-100"
            >
              {/* IMAGE */}
              <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                />
              </div>

              {/* TEXT INFO */}
              <div className="flex-grow w-full sm:w-auto">
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {item.name}
                </p>

                <div className="flex flex-wrap items-center mt-1 space-x-2 text-sm">
                  {/* Type Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold ${badge}`}
                  >
                    {emoji} {item.type}
                  </span>

                  {/* Meal */}
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                    {item.meal}
                  </span>

                  {/* Category */}
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* PRICE + ACTIONS */}
              <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-4 text-right flex flex-col items-end space-y-2">
                <p className="text-xl font-extrabold text-indigo-600">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => console.log(`Edit item ${item.id}`)}
                    className="px-3 py-1 text-xs font-semibold rounded-full text-white bg-blue-500 
                    hover:bg-blue-600 transition duration-150 shadow-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => console.log(`Delete item ${item.id}`)}
                    className="px-3 py-1 text-xs font-semibold rounded-full text-white bg-red-500 
                    hover:bg-red-600 transition duration-150 shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fooddisplay;
