import React, { useState, useEffect } from "react";
import { getItems } from "../services/api";
import { NavLink } from "react-router-dom";

const getFoodTypeInfo = (type) => {
  return type === "veg"
    ? { badge: "bg-green-100 text-green-800", emoji: "🌿" }
    : { badge: "bg-red-100 text-red-800", emoji: "🥩" };
};

const Fooddisplay = () => {
  const [item, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const getallItems = async () => {
    let res = await getItems();
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getallItems();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(item.length / itemsPerPage);

  // Slice items for current page
  const paginatedItems = item.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl h-full overflow-y-auto">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Food Item Dashboard ({item.length} Items)
      </h2>

      {/* Loading Shimmer */}
      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
        </div>
      )}

      {/* Empty State */}
      {!loading && item.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-4">
          No food items available 🍽️
        </p>
      )}

      {/* Items */}
      <div className="space-y-4">
        {paginatedItems.map((item, key) => {
          const { badge, emoji } = getFoodTypeInfo(item.foodType);

          return (
            <div
              key={item.id || key}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 
              p-4 rounded-xl shadow-md transition duration-200 hover:shadow-lg hover:bg-white 
              border border-gray-100"
            >
              <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                <img
                  src={item.imageFile}
                  alt={item.foodName}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                />
              </div>

              <div className="flex-grow w-full sm:w-auto">
                <p className="text-lg font-bold text-gray-900">
                  {item.foodName}
                </p>

                <div className="flex flex-wrap items-center mt-1 space-x-2 text-sm">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold ${badge}`}
                  >
                    {emoji} {item.foodType}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {item.mealType}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-4 text-right flex flex-col items-end space-y-2">
                <p className="text-xl font-extrabold text-indigo-600">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  <NavLink to={`/edit/${item._id}`}>
                    <button className="px-3 py-1 text-xs text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600">
                      Edit
                    </button>
                  </NavLink>
                  <NavLink to={`/delete/${item._id}`}>
                    <button className="px-3 py-1 text-xs text-white bg-red-500 rounded-full shadow-md hover:bg-red-600">
                      Delete
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION UI */}
      {item.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {/* Prev Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === index + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Fooddisplay;
