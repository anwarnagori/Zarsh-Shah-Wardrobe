import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";

export default function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        const published = Array.isArray(data)
          ? data.filter((p) => p.status === "published" || !p.status)
          : [];
        setItems(published);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-6">Shop</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article
            key={p._id}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <Link to={`/post/${p._id}`}>
              <img
                src={p.cover || "/placeholder.png"}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
