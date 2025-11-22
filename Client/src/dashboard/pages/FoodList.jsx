import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getItems, deleteStudent } from "../services/foodApi.js"; // update API if needed
import FoodTable from "../components/FootTable.jsx";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    try {
      const res = await getItems();
      setFoods(res);
      setLoading(false);
    } catch (err) {
      console.log("Error loading food items", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  // Pagination calculation
  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const paginatedFoods = foods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout title="Food List">
      <FoodTable
        foods={paginatedFoods}
        loading={loading}
      />
      {/* PAGINATION UI */}
      {foods.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default FoodList;
