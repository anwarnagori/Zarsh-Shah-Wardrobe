"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/utils/auth";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
    }
  }, []);

  return <>{children}</>;
}
