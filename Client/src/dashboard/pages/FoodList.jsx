import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getItems } from "../services/foodApi.js"; // update API if needed
import FoodTable from "../components/FootTable.jsx";
import EditModal from "./EditModal.jsx";
const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(foods.length / itemsPerPage); // Pagination calculation
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

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  const paginatedFoods = foods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <AdminLayout title="Food List">
      <FoodTable
        foods={paginatedFoods}
        loading={loading}
        openEditModal={openEditModal}
      />
      {showModal && (
        <EditModal
          itemId={editId}
          closeModal={closeEditModal}
          refreshItems={loadData}
        />
      )}
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
