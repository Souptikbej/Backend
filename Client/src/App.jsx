import React from "react";
import { Routes, Route } from "react-router-dom";

// Dashboard Pages
import DashboardHome from "./dashboard/pages/DashboardHome";
import AddFood from "./dashboard/pages/AddFood";
import FoodList from "./dashboard/pages/FoodList";
import Orders from "./dashboard/pages/Orders";

const App = () => {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/add-food" element={<AddFood />} />
      <Route path="/dashboard/foods" element={<FoodList />} />
      <Route path="/dashboard/orders" element={<Orders />} />

      {/* Default Route */}
      <Route path="*" element={<DashboardHome />} />
    </Routes>
  );
};

export default App;
