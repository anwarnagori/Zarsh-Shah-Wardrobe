import api from "../api/axios";

export const getProducts = () => api.get("/products").then(r => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data);
export const createProduct = (data) => api.post("/products", data).then(r => r.data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data).then(r => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(r => r.data);
