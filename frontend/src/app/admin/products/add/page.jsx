"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    sizes: "",
    colors: "",
    images: "",
    isFeatured: false,
    status: "active",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          ...form,
          sizes: form.sizes.split(","),
          colors: form.colors.split(","),
          images: form.images.split(","),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Product uploaded successfully!");
      console.log(res.data);
      setForm({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        sizes: "",
        colors: "",
        images: "",
        isFeatured: false,
        status: "active",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      {message && <p className="mb-3 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "name",
          "description",
          "brand",
          "category",
          "price",
          "stock",
          "sizes",
          "colors",
          "images",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required={["name", "price", "category"].includes(field)}
          />
        ))}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          <span>Featured Product?</span>
        </label>

        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}
