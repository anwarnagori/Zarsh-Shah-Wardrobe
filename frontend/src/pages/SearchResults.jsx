import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/products?q=${query}`)
        .then((res) => setProducts(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border rounded-md p-4">
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover mb-2"
              />
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-gray-600">${p.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
