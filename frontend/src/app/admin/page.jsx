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
}"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchData = async () => {
      try {
        // Example API calls (replace with real backend routes)
        const [prodRes, ordRes, userRes, revRes] = await Promise.all([
          axios.get("http://localhost:4000/api/products"),
          axios.get("http://localhost:4000/api/orders"),
          axios.get("http://localhost:4000/api/users"),
          axios.get("http://localhost:4000/api/orders/revenue"),
        ]);

        setStats({
          products: prodRes.data.length || 0,
          orders: ordRes.data.length || 0,
          users: userRes.data.length || 0,
          revenue: revRes.data.total || 0,
        });

        // Mock chart data
        setChartData([
          { name: "Mon", sales: 5000 },
          { name: "Tue", sales: 8000 },
          { name: "Wed", sales: 4000 },
          { name: "Thu", sales: 9000 },
          { name: "Fri", sales: 7000 },
          { name: "Sat", sales: 10000 },
          { name: "Sun", sales: 6000 },
        ]);

        setRecentOrders(ordRes.data.slice(0, 5));
      } catch (err) {
        console.error("Dashboard data error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Monitor your store’s performance in real-time.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Package className="text-amber-600" size={28} />}
          label="Products"
          value={stats.products}
        />
        <StatCard
          icon={<ShoppingBag className="text-amber-600" size={28} />}
          label="Orders"
          value={stats.orders}
        />
        <StatCard
          icon={<Users className="text-amber-600" size={28} />}
          label="Users"
          value={stats.users}
        />
        <StatCard
          icon={<DollarSign className="text-amber-600" size={28} />}
          label="Revenue"
          value={`Rs ${stats.revenue.toLocaleString()}`}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Sales</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#f59e0b" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{order._id?.slice(0, 8)}</td>
                  <td className="py-3">{order.customerName || "N/A"}</td>
                  <td className="py-3">Rs {order.total || 0}</td>
                  <td
                    className={`py-3 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {order.status || "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition duration-300">
      <div className="bg-amber-100 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

