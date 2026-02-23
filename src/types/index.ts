import { ReactNode } from "react";
import { SelectOption } from "./forms.ts";

// Базовые типы данных
export interface User {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
}

export type UserRole = "user" | "admin";

// Типы для состояния Redux
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface PatientsState {
  //cars: Car[];
  optionsCars: SelectOption[];
  isLoading: boolean;
  error: string | null;
}

export interface IMessage {
  type: string;
  title: string;
  message: ReactNode | string;
}

export interface IMessageSlice {
  message: IMessage;
}

// Root state
export interface RootState {
  auth: AuthState;
}

export type IUrlParam = {
  id: string;
};
