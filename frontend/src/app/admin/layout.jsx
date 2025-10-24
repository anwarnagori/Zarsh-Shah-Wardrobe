"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait a tiny bit so localStorage is ready
    const timer = setTimeout(() => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("adminToken");
      if (!token) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
