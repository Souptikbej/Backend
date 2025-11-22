import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { addFood } from "../services/foodApi";

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    category: "",
    foodType: "veg",
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  //🔥 FORM VALIDATION
  const isFormValid =
    formData.foodName.trim() !== "" &&
    formData.price !== "" &&
    formData.price > 0 &&
    formData.category.trim() !== "" &&
    formData.imageFile !== null;

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear old toast
    setToast({ type: "", message: "" });
    setTouched({ ...touched, [e.target.name]: true });
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({ ...formData, imageFile: file });
    setToast({ type: "", message: "" });

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleReset = () => {
    setFormData({
      foodName: "",
      price: "",
      category: "",
      foodType: "veg",
      imageFile: null,
    });
    setImagePreview(null);
    setToast({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      showToast("error", "Please fill all fields correctly.");
      return;
    }

    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append("foodName", formData.foodName);
      fd.append("price", formData.price);
      fd.append("category", formData.category);
      fd.append("foodType", formData.foodType);
      fd.append("imageFile", formData.imageFile);

      const res = await addFood(fd);

      if (res && res.status === 201) {
        showToast("success", "Food item added successfully!");

        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast("error", "Insert failed!");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Server error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Food">
      {/* 🔥 Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="p-6 bg-white shadow-xl rounded-xl max-w-2xl mx-auto my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-blue-500 flex items-center gap-2">
          🍕 Add New Food Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              name="foodName"
              type="text"
              placeholder="e.g., Tandoori Chicken"
              value={formData.foodName}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                touched.foodName && formData.foodName.trim() === ""
                  ? "border-red-400"
                  : "border-gray-300"
              } focus:ring-blue-500`}
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                placeholder="e.g., 199"
                value={formData.price}
                min="1"
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${
                  touched.price &&
                  (formData.price <= 0 || formData.price === "")
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-blue-500`}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                type="text"
                placeholder="Main Course / Starter"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${
                  touched.category && formData.category.trim() === ""
                    ? "border-red-400"
                    : "border-gray-300"
                } focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-blue-500"
            >
              <option value="veg">🌿 Veg</option>
              <option value="nonveg">🥩 Non-Veg</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Food Image
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  alt="Preview"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full p-3 rounded-lg border ${
                touched.imageFile && !formData.imageFile
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`flex-1 py-3 rounded-lg text-white font-bold shadow-lg transition ${
                isFormValid && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Adding..." : "Save Food"}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddFood;
