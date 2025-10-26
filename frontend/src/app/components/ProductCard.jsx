import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.name}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-amber-700 font-bold mt-2">Rs. {product.price}</p>
        <Link
          href={`/products/${product._id}`}
          className="inline-block mt-3 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
