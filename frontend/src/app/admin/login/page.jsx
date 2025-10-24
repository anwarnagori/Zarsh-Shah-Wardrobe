"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/login",
        { email, password }
      );
      localStorage.setItem("adminToken", data.token);
      router.push("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('data:image/jpeg;base64,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')",
      }}
    >
      {/* Overlay for blur and color tint */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-[380px] max-w-sm animate-fadeIn">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2022.svg"
            alt="Zarsh Shah Logo"
            className="h-10 mb-2"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Zarsh Shah Admin
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to manage your wardrobe
          </p>
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 mb-3 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none rounded-md px-3 py-2 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none rounded-md px-3 py-2 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 Zarsh Shah Wardrobe
        </p>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
