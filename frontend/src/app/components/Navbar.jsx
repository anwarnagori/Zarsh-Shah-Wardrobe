"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-amber-700">
          Zarsh Shah
        </Link>

        {/* Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <Link href="/products" className="hover:text-amber-600">Products</Link>
          <Link href="/about" className="hover:text-amber-600">About</Link>
          <Link href="/contact" className="hover:text-amber-600">Contact</Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-700 hover:text-amber-700">🛒</Link>
          <Link
            href="/login"
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
