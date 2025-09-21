import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        const published = Array.isArray(data)
          ? data.filter((p) => p.status === "published" || !p.status)
          : [];
        setPosts(published);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <Link to={`/post/${post._id}`} key={post._id} className="group">
              <div className="h-72 bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src={post.cover || "/placeholder.png"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 p-4">
                  <h3 className="text-white text-2xl font-semibold">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/90">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Latest</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            posts.map((p) => (
              <article
                key={p._id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm"
              >
                <Link to={`/post/${p._id}`}>
                  <img
                    className="h-48 w-full object-cover"
                    src={p.cover || "/placeholder.png"}
                    alt={p.title}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {p.excerpt}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      {p.author?.name || "Admin"} •{" "}
                      {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
