import { apiClient } from "./apiClient";
import { IUnit } from "../types";

export const ApiUnit = {
  getUnit: async (id: number): Promise<IUnit> => {
    return apiClient.get<IUnit>(`/units/${id}`);
  },

  createUnit: async (formData: FormData): Promise<IUnit> => {
    return apiClient.postFormData<IUnit>("/units", formData);
  },

  updateUnit: async (id: number, formData: FormData): Promise<IUnit> => {
    return apiClient.putFormData<IUnit>(`/units/${id}`, formData);
  },

  deleteUnit: async (id: number): Promise<IUnit> => {
    return apiClient.delete<IUnit>(`/units/${id}`);
  },
};
