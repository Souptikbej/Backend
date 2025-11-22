import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { addFood } from "../services/foodApi";
// Assuming addFood(data) handles the POST request, now expecting FormData

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    category: "",
    foodType: "veg",
    imageFile: null, // Stores the File object
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to check if the form is valid for submission
  const isFormValid =
    formData.foodName.trim() !== "" &&
    formData.price > 0 && // Ensure price is a valid positive number
    formData.category.trim() !== "" &&
    formData.imageFile !== null;

  // Handler for all standard text/number/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear messages on input change
    setSuccessMessage("");
    setErrorMessage("");

    // Special handling for price to ensure it's stored as a string or number correctly
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  // Handler for the file input
  const handleFileChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // 🚨 CRITICAL FIX: Use FormData for sending files and text data
      const dataToSend = new FormData();
      dataToSend.append("foodName", formData.foodName);
      dataToSend.append("price", formData.price);
      dataToSend.append("category", formData.category);
      dataToSend.append("foodType", formData.foodType);
      // Append the actual File object
      dataToSend.append("imageFile", formData.imageFile);

      const res = await addFood(dataToSend);
      if (res && res.status === 201) {
        setSuccessMessage("Food item added successfully!");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        console.log("Insert Failed:", res);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      setErrorMessage("Failed to add food item. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Food">
      <div className="p-4 sm:p-6 lg:p-8 bg-white shadow-2xl rounded-xl max-w-2xl mx-auto my-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-500 pb-3 flex items-center gap-2">
          <span role="img" aria-label="pizza">
            🍕
          </span>{" "}
          Add New Food Item
        </h1>

        {/* Messages */}
        {successMessage && (
          <div
            className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 shadow-sm"
            role="alert"
          >
            <p className="font-semibold">Success:</p>
            <span className="block">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 shadow-sm"
            role="alert"
          >
            <p className="font-semibold">Error:</p>
            <span className="block">{errorMessage}</span>
          </div>
        )}

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name */}
          <div>
            <label
              htmlFor="foodName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food Name
            </label>
            <input
              id="foodName"
              name="foodName"
              type="text"
              placeholder="e.g., Spicy Tandoori Chicken"
              value={formData.foodName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              required
            />
          </div>

          {/* Price & Category (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (USD)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 12.99"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                required
                min="0.01"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g., Main Course, Beverage, Side"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Food Type (Select) */}
          <div>
            <label
              htmlFor="foodType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="foodType"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition duration-150 shadow-sm"
            >
              <option value="veg">🌿 Veg</option>
              <option value="nonveg">🥩 Non-Veg</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Food Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:border-blue-500 transition duration-200">
              <div className="space-y-1 text-center">
                {formData.imageFile ? (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      File selected: **{formData.imageFile.name}**
                    </p>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-8m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l-2.172 2.172a4 4 0 00-5.656 0L12 36h20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 p-1"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="imageFile"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`
              w-full py-3 mt-4 rounded-lg text-lg font-bold shadow-lg 
              transition duration-300 ease-in-out transform 
              ${
                isFormValid && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                  : "bg-blue-300 text-blue-100 cursor-not-allowed"
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Food...
              </span>
            ) : (
              "Save New Food Item"
            )}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddFood;
