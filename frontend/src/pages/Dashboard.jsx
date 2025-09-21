import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    cover: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setItems(data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newItem = await createProduct(form);
      setItems((prev) => [newItem, ...prev]);
      setForm({
        title: "",
        excerpt: "",
        content: "",
        cover: "",
        status: "draft",
      });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteProduct(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (e) {
      alert("Delete failed");
    }
  };

  if (!user || user.role !== "admin")
    return <div className="p-6">Not authorized</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <section className="mb-8 bg-white p-4 border rounded">
        <h2 className="font-semibold mb-2">Create Post</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="p-2 border rounded"
          />
          <input
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Excerpt"
            className="p-2 border rounded"
          />
          <input
            value={form.cover}
            onChange={(e) => setForm({ ...form, cover: e.target.value })}
            placeholder="Cover image URL"
            className="p-2 border rounded"
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Content (HTML allowed)"
            className="p-2 border rounded h-32"
          ></textarea>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            disabled={loading}
            className="bg-amber-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-semibold mb-4">All Posts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white border p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="capitalize">
                      {item.status || "published"}
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        window.location.origin + "/post/" + item._id
                      )
                    }
                    className="text-xs border px-2 py-1 rounded"
                  >
                    Copy link
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
