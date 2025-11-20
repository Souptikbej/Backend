import React, { useState } from "react";
import { useRef } from "react";
import { addStudent } from "../services/api.js";
// Main application component
const Foodform = () => {
  // State to hold all form data
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "veg", // Default to Veg
    mealType: "Breakfast", // Default to Breakfast
    category: "",
    price: "",
    imageFile: null,
  });
  // State to handle the error message in pop up display
  const [error, setError] = useState("");
  // State to handle the preview image URL (for display purposes)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Handler for all text and number inputs
  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handler for the file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
      // Create a URL for image preview (browser-side only)
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: null,
      }));
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl("");
    }
  };
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const ErrorPopup = ({ message }) => {
    return (
      <div className="fixed top-5 right-5 z-50">
        <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg transform animate-slide-in">
          <p className="font-semibold">{message}</p>
        </div>
      </div>
    );
  };

  const handleReset = () => {
    setFormData({
      foodName: "",
      foodType: "veg",
      mealType: "Breakfast",
      category: "",
      price: "",
      imageFile: null,
    });
    setImagePreviewUrl("");
  };
  const validfoodName = useRef(null);
  const validfoodType = useRef(null);
  const validmealType = useRef(null);
  const validcategory = useRef(null);
  const validprice = useRef(null);
  const validimageFile = useRef(null);
  const submitFormdata = async (e) => {
    e.preventDefault();

    // Check required field
    if (!formData.foodName) {
      validfoodName.current.focus();
      showError("Food name is required!");
      return;
    } else if (!formData.foodType) {
      validfoodType.current.focus();
      showError("Food type is required!");
      return;
    } else if (!formData.mealType) {
      validmealType.current.focus();
      showError("Food meal type is required!");
      return;
    } else if (!formData.category) {
      validcategory.current.focus();
      showError("Food category is required!");
      return;
    } else if (!formData.price || Number(formData.price) <= 0) {
      validprice.current.focus();
      showError("Enter a valid food price!");
      return;
    } else if (!formData.imageFile) {
      validimageFile.current.focus();
      showError("Food image is required!");
      return;
    } else {
      try {
        const itemdata = new FormData();
        itemdata.append("foodName", formData.foodName);
        itemdata.append("foodType", formData.foodType);
        itemdata.append("mealType", formData.mealType);
        itemdata.append("category", formData.category);
        itemdata.append("price", formData.price);
        itemdata.append("imageFile", formData.imageFile); // MUST match upload.single('imageFile')
        const res = await addStudent(itemdata);
        if (res && res.status === 201) {
          showError("Inserted Successfully");
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          console.log("Insert Failed:", res);
        }
      } catch (err) {
        console.log("Error while Insert Data", err);
        showError("Failed to insert data!");
      }
    }
  };

  // Define options for Meal Type
  const mealTypeOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Beverage",
  ];

  // Simple display of current form data (for demonstration)
  const FormDisplay = () => {
    // FIX: Safely parse the price value. If it's an empty string or invalid (NaN),
    // default it to 0 before calling .toFixed(2) to prevent the application crash.
    const displayPrice = (parseFloat(formData.price) || 0).toFixed(2);

    return (
      <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Current Data Preview
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            <span className="font-medium text-gray-900">Name:</span>{" "}
            {formData.foodName || "N/A"}
          </li>
          <li>
            <span className="font-medium text-gray-900">Type:</span>{" "}
            <span
              className={`font-semibold ${
                formData.foodType === "veg" ? "text-green-600" : "text-red-600"
              }`}
            >
              {formData.foodType}
            </span>
          </li>
          <li>
            <span className="font-medium text-gray-900">Meal:</span>{" "}
            {formData.mealType}
          </li>
          <li>
            <span className="font-medium text-gray-900">Category:</span>{" "}
            {formData.category || "N/A"}
          </li>
          {/* Using the safe displayPrice variable */}
          <li>
            <span className="font-medium text-gray-900">Price:</span> $
            {displayPrice}
          </li>
          <li>
            <span className="font-medium text-gray-900">Image:</span>{" "}
            {formData.imageFile ? formData.imageFile.name : "No file selected"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {error && <ErrorPopup message={error} />}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Add New Food Item
        </h1>

        <form className="space-y-6">
          {/* Food Name */}
          <div>
            <label
              htmlFor="foodName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              id="foodName"
              ref={validfoodName}
              value={formData.foodName}
              onChange={handleChange}
              placeholder="e.g., Spicy Tuna Roll"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>

          {/* Food Type (Veg/Non-Veg) */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Type
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="foodType"
                  value="veg"
                  ref={validfoodType}
                  checked={formData.foodType === "veg"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  🌿 Vegetarian
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="foodType"
                  value="non-veg"
                  checked={formData.foodType === "non-veg"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  🥩 Non-Vegetarian
                </span>
              </label>
            </div>
          </div>

          {/* Meal Type (Breakfast, Lunch, etc.) */}
          <div>
            <label
              htmlFor="mealType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Meal Type
            </label>
            <select
              name="mealType"
              id="mealType"
              ref={validmealType}
              value={formData.mealType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white transition duration-150"
            >
              {mealTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              type="text"
              name="category"
              id="category"
              ref={validcategory}
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Japanese, Dessert, Fast Food"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price (USD)
            </label>
            <div className="mt-1 relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                ref={validprice}
                // The value is allowed to be a string (like "1.5" or "") for control purposes
                value={formData.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="19.99"
                className="block w-full pl-7 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                required
              />
            </div>
          </div>

          {/* Food Image */}
          <div>
            <label
              htmlFor="imageFile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-8-20h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="imageFile"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      ref={validimageFile}
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {formData.imageFile && (
                  <p className="text-xs font-semibold text-indigo-700 mt-1">
                    Selected: {formData.imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreviewUrl && (
            <div className="pt-2">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreviewUrl}
                alt="Food Preview"
                className="w-full h-48 object-cover rounded-xl shadow-md border border-gray-200"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            {/* The submission button is included for completeness, even if the action is empty */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              onClick={submitFormdata}
            >
              Save Item
            </button>
            <button
              type="button"
              className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        <FormDisplay />
      </div>
    </div>
  );
};

export default Foodform;
