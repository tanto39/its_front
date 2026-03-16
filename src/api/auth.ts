import { apiClient } from './apiClient';
import { AuthResponse } from '../types/index.ts';
import { LoginFormData } from '../types/forms.ts';

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): any => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};