// frontend/utils/auth.js
export const isAdminAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("adminToken");
  return !!token;
};
