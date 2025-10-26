export default function Hero() {
  return (
    <section
      className="h-[90vh] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600180758890-6cc88d2ec97b')",
      }}
    >
      <div className="bg-black/40 p-10 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          New Festive Collection 2025
        </h1>
        <p className="text-gray-200 text-lg mb-6">
          Explore the latest designs by Zarsh Shah Wardrobe
        </p>
        <a
          href="/products"
          className="bg-amber-600 text-white px-6 py-3 rounded-md text-lg hover:bg-amber-700 transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
