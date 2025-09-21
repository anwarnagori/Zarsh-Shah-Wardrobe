import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${query}`);
      setQuery("");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link to="/catalogs" className="hover:text-amber-600">
              All Catalogs
            </Link>
            <Link to="/size-guide" className="hover:text-amber-600">
              Size Guide
            </Link>
          </nav>

          <Link to="/" className="text-2xl font-serif text-amber-600">
            Zarsh Shah Wardrobe
          </Link>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-500"
              >
                <FiSearch />
              </button>
            </form>

            <button className="text-xl">
              <FiShoppingCart />
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-sm bg-amber-600 text-white px-3 py-1 rounded-md"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm border px-3 py-1 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm px-3 py-1 border rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-3 py-1 bg-amber-600 text-white rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
