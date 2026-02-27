import {IUser, UserRole} from './index';

// Типы для ответов API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface AuthResponse {
  user: IUser;
  token?: string;
}

export interface UserResponse {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
}
