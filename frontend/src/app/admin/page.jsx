"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Dummy API call (replace with your backend stats endpoint)
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get("http://localhost:4000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        console.log("⚠️ Stats fetch failed:", err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-amber-700 mb-6">
        🏠 Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Products</h2>
          <p className="text-4xl font-bold text-amber-700 mt-2">
            {stats.products}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Orders</h2>
          <p className="text-4xl font-bold text-amber-700 mt-2">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Users</h2>
          <p className="text-4xl font-bold text-amber-700 mt-2">
            {stats.users}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📊 Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li>✅ 3 new products added today</li>
          <li>🧾 5 new orders placed</li>
          <li>👥 2 new users registered</li>
        </ul>
      </div>
    </div>
  );
}
