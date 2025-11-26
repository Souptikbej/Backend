import { useState, useEffect } from "react";
import axios from "axios";

const EditModal = ({ itemId, closeModal, refreshItems }) => {
  const [form, setForm] = useState({
    foodName: "",
    foodType: "",
    mealType: "",
    category: "",
    price: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/item/${itemId}`).then((res) => {
      const item = res.data;

      setForm({
        foodName: item.foodName || "",
        foodType: item.foodType || "",
        mealType: item.mealType || "",
        category: item.category || "",
        price: item.price || "",
      });
    });
  }, [itemId]);

  const submitEdit = async () => {
    const fd = new FormData();

    fd.append("foodName", form.foodName);
    fd.append("foodType", form.foodType);
    fd.append("mealType", form.mealType);
    fd.append("category", form.category);
    fd.append("price", form.price);

    if (image) fd.append("image", image);

    await axios.put(`http://localhost:8000/item/${itemId}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    refreshItems();
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <h3>Edit Food</h3>

        {/* FOOD NAME */}
        <input
          value={form.foodName}
          onChange={(e) => setForm({ ...form, foodName: e.target.value })}
          placeholder="Food Name"
        />

        {/* FOOD TYPE */}
        <input
          value={form.foodType}
          onChange={(e) => setForm({ ...form, foodType: e.target.value })}
          placeholder="Food Type"
        />

        {/* MEAL TYPE */}
        <input
          value={form.mealType}
          onChange={(e) => setForm({ ...form, mealType: e.target.value })}
          placeholder="Meal Type"
        />

        {/* CATEGORY */}
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
        />

        {/* PRICE */}
        <input
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
        />

        {/* IMAGE */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button onClick={submitEdit}>Save Changes</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
