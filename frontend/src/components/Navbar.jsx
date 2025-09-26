import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side links */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/catalogs">All Catalogs</Link>
            <Link to="/size-guide">Size Guide</Link>
          </nav>

          {/* Center Logo */}
          <Link to="/" className="text-2xl font-serif text-amber-600">
            Zarsh Shah Wardrobe
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 text-gray-500 hover:text-amber-600"
              >
                <FiSearch size={18} />
              </button>
            </div>

            <button className="text-gray-700 hover:text-amber-600">
              <FiShoppingCart size={20} />
            </button>

            {user ? (
              <button
                onClick={logout}
                className="text-gray-700 hover:text-amber-600"
              >
                <FiUser size={20} />
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-amber-600">
                <FiUser size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
