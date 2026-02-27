import { apiClient } from './apiClient';
import { IUser } from '../types';

export const ApiUsers = {
  getUsers: async (): Promise<IUser[]> => {
    return apiClient.get<IUser[]>('/users');
  },

  getUser: async (login: string): Promise<IUser> => {
    return apiClient.get<IUser>(`/users/${login}`);
  },

  createUser: async (data: Omit<IUser, 'login'>): Promise<IUser> => {
    return apiClient.post<IUser>('/users', data);
  },

  updateUser: async (login: string, data: Partial<IUser>): Promise<IUser> => {
    return apiClient.put<IUser>(`/Useres/${login}`, data);
  },

  deleteUser: async (login: string): Promise<IUser> => {
    return apiClient.delete<IUser>(`/users/${login}`);
  },
};