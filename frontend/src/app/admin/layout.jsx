"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("adminToken");
      if (!token) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2022.svg"
              alt="Zarsh Shah Logo"
              className="h-8"
            />
            <h1 className="text-lg font-semibold text-gray-800">
              Zarsh Admin
            </h1>
          </div>

          <nav className="space-y-3">
            <Link
              href="/admin"
              className="block py-2.5 px-4 rounded-lg hover:bg-amber-100 text-gray-700 font-medium transition"
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="block py-2.5 px-4 rounded-lg hover:bg-amber-100 text-gray-700 font-medium transition"
            >
              📦 Products
            </Link>
            <Link
              href="/admin/orders"
              className="block py-2.5 px-4 rounded-lg hover:bg-amber-100 text-gray-700 font-medium transition"
            >
              📜 Orders
            </Link>
            <Link
              href="/admin/users"
              className="block py-2.5 px-4 rounded-lg hover:bg-amber-100 text-gray-700 font-medium transition"
            >
              👥 Users
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome, Admin 👋
        </h2>
        <div className="bg-white shadow-md rounded-xl p-6">{children}</div>
      </main>
    </div>
  );
}
