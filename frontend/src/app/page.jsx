// "use client";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data.data || []); // backend me `data: []` aata hai
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center">Loading products...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">📦 Products List</h1>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {products.map((p) => (
//             <div key={p._id} className="border p-4 rounded-lg shadow">
//               <img
//                 src={p.images?.[0] || "/placeholder.png"}
//                 alt={p.name}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <h2 className="text-lg font-medium mt-2">{p.name}</h2>
//               <p className="text-gray-600">Rs. {p.price}</p>
//               <p className="text-sm text-gray-500">{p.category}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import FeaturedProducts from "../app/components/FeaturedProducts";
import Footer from "../app/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
