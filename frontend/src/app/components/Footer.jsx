export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Zarsh Shah</h3>
          <p>Luxury fashion for modern women. Handcrafted with elegance.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-amber-500">Home</a></li>
            <li><a href="/products" className="hover:text-amber-500">Shop</a></li>
            <li><a href="/about" className="hover:text-amber-500">About</a></li>
            <li><a href="/contact" className="hover:text-amber-500">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-3 text-2xl">
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p>Email: support@zarshshah.com</p>
          <p>Phone: +92 300 1234567</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        © 2025 Zarsh Shah Wardrobe. All rights reserved.
      </p>
    </footer>
  );
}
