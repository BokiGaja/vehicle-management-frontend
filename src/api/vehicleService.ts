import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3500"; // ✅ Use without VITE_ prefix

const api = axios.create({ baseURL: API_BASE_URL });

export const fetchVehicles = async ({ pageParam = 1 }) => {
  const { data } = await api.get(`/vehicles?page=${pageParam}&limit=10`);
  return data;
};

export const fetchVehicleBySlug = async (slug: string) => {
  const { data } = await api.get(`/vehicles/${slug}`);
  return data;
};

export const createVehicle = async (vehicleData: any) => {
  try {
    const response = await api.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "An error occurred";
  }
};

export const updateVehicle = async (id: string, vehicleData: any) => {
  try {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "An error occurred";
  }
};


export const deleteVehicle = async (id: number) => {
  const { data } = await api.delete(`/vehicles/${id}`);
  return data;
};