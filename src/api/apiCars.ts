import { apiClient } from './apiClient';
import { ICar } from '../types';

export const ApiCars = {
  getCars: async (): Promise<ICar[]> => {
    return apiClient.get<ICar[]>('/cars');
  },

  getCar: async (id: number): Promise<ICar> => {
    return apiClient.get<ICar>(`/cars/${id}`);
  },

  createCar: async (data: Omit<ICar, 'car_id'>): Promise<ICar> => {
    return apiClient.post<ICar>('/cars', data);
  },

  updateCar: async (id: number, data: Partial<ICar>): Promise<ICar> => {
    return apiClient.put<ICar>(`/cars/${id}`, data);
  },

  deleteCar: async (id: number): Promise<ICar> => {
    return apiClient.delete<ICar>(`/cars/${id}`);
  },
};