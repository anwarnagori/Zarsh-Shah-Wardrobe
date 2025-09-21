import api from "../api/axios";

export const registerApi = (data) => api.post("/auth/register", data).then(r => r.data);
export const loginApi = (data) => api.post("/auth/login", data).then(r => r.data);
export const meApi = () => api.get("/auth/me").then(r => r.data);
export const forgotPasswordApi = (data) => api.post("/auth/forgot-password", data).then(r => r.data);
export const resetPasswordApi = (token, data) => api.post(`/auth/reset-password/${token}`, data).then(r => r.data);
