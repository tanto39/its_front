import { apiClient } from "./apiClient";
import { IStats } from "../types";

export const apiStats = {
  getStats: async (): Promise<IStats> => {
    return apiClient.get<IStats>('/stats/');
  },

};
