import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Utensils, List, ShoppingCart } from "lucide-react"; // Importing icons for visual appeal

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Add Food", path: "/dashboard/add-food", icon: Utensils },
  { name: "Food List", path: "/dashboard/foods", icon: List },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
];

const AdminLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-indigo-700 text-white font-semibold shadow-md"
        : "text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
    }`;
  };

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-900 text-white transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto md:shadow-lg h-full p-6`}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold tracking-wider">
          Food Admin <span className="text-indigo-400">Panel</span> 🚀
        </h2>
        <button
          className="text-white md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={getLinkClasses(item.path)}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after clicking
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar (Desktop and Mobile Menu) */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header/Top Bar (Mobile Menu Button + Title) */}
        <header className="bg-white shadow-md p-4 md:p-6 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <button
              className="text-indigo-600 md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title}
            </h1>
            <div className="hidden md:block">
              {/* Optional: Add user/profile info here */}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 min-h-[calc(100vh-140px)]">
            {/* The actual content passed as children */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
