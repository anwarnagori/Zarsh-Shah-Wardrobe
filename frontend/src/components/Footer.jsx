import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Zarsh Shah Wardrobe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
