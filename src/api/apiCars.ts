import { apiClient } from "./apiClient";
import { ICar } from "../types";

export const ApiCars = {
  getCars: async (): Promise<ICar[]> => {
    return apiClient.get<ICar[]>("/cars");
  },

  getCar: async (id: number): Promise<ICar> => {
    return apiClient.get<ICar>(`/cars/${id}`);
  },

  createCar: async (formData: FormData): Promise<ICar> => {
    return apiClient.postFormData<ICar>("/cars", formData);
  },

  updateCar: async (id: number, formData: FormData): Promise<ICar> => {
    return apiClient.putFormData<ICar>(`/cars/${id}`, formData);
  },

  deleteCar: async (id: number): Promise<ICar> => {
    return apiClient.delete<ICar>(`/cars/${id}`);
  },
};
