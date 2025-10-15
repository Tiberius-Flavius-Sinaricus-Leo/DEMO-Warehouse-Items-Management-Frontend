import axios from "axios";
import { BACKEND_URL } from "./config";
import type { CategoryRequest, CategoryResponse } from "./types/category";
import type { ItemResponse, ItemRequest } from "./types/item";
import type { AuthRequest, AuthResponse } from "./types/login";

const apiClient = axios.create({
  baseURL: BACKEND_URL as string,
  withCredentials: true, 
});

/* ------------------------ APIs ------------------------ */

export const AuthApi = {
  login: async (dto: AuthRequest) => apiClient.post<AuthResponse>("/login", dto),
  // Since the cookie is HttpOnly, we cannot access it via JavaScript. We just need to make a request to the backend to check if the user is logged in.
  checkLogin: async () => apiClient.get<AuthResponse>("/check-login"),
  logout: async () => apiClient.post("/logout"),
};

export const CategoryApi = {
  addCategory: async (dto: CategoryRequest) => apiClient.post("/admin/categories", dto),
  deleteCategory: async (id: string) => apiClient.delete(`/admin/categories/${id}`),
  getAllCategories: async () => {
    const res = await apiClient.get<CategoryResponse[]>("/categories/all");
    return res.data;
  },
  getCategory: async (id: string) => {
    const res = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return res.data;
  },
  updateCategory: async (id: string, dto: CategoryRequest) => apiClient.patch(`/admin/categories/${id}`, dto),
};

export const ItemApi = {
  addItem: async (dto: ItemRequest) => apiClient.post("/admin/items", dto),
  getItem: async (id: string) => {
    const res = await apiClient.get<ItemResponse>(`/items/${id}`);
    return res.data;
  },
  getAllItems: async () => {
    const res = await apiClient.get<ItemResponse[]>("/items/all");
    return res.data;
  },
  getItemsByCategory: async (categoryId: string) => {
    const res = await apiClient.get<ItemResponse[]>(`/items/${categoryId}/all`);
    return res.data;
  },
  countItemsByCategory: async (categoryId: string) => {
    const res = await apiClient.get<number>(`/items/${categoryId}/count`);
    return res.data;
  },
  deleteItem: async (id: string) => apiClient.delete(`/admin/items/${id}`),
  updateItem: async (id: string, dto: ItemRequest) => apiClient.patch(`/admin/items/${id}`, dto),
};
