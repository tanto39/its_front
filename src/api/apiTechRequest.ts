import { apiClient } from "./apiClient";
import { ITechRequest } from "../types";
import { techRequestForm } from "../types/forms";

export const apiTechRequest = {
  getTechRequests: async (): Promise<ITechRequest[]> => {
    return apiClient.get<ITechRequest[]>("/tech-requests");
  },

  getTechRequest: async (id: number): Promise<ITechRequest> => {
    return apiClient.get<ITechRequest>(`/tech-requests/${id}`);
  },

  createTechRequest: async (data: techRequestForm): Promise<ITechRequest> => {
    return apiClient.post<ITechRequest>("/tech-requests", data);
  },

  updateTechRequest: async (id: number, data: techRequestForm): Promise<ITechRequest> => {
    return apiClient.put<ITechRequest>(`/tech-requests/${id}`, data);
  },

  deleteTechRequest: async (id: number): Promise<ITechRequest> => {
    return apiClient.delete<ITechRequest>(`/tech-requests/${id}`);
  },
};
