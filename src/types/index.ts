import { ReactNode } from "react";
import { SelectOption } from "./forms.ts";

// Базовые типы данных
export interface IUser {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
}

export type UserRole = "user" | "admin";

export interface IUnit {
  unit_id: number,
  name: string,
  car_id: number,
  date_repair: string,
  its: number,
  info: string,
  image_url: string
}
export interface ICar {
  car_id: number,
  name: string,
  reg_number: string,
  date_tech: string,
  date_repair: string,
  milage: number,
  its: number,
  info: string,
  image_url?: string,
  person?: IUser,
  units?: IUnit[],
}

// Типы для состояния Redux
export interface AuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UsersState {
  users: IUser[];
  optionsUsers: SelectOption[];
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  successSend: boolean;
}

export interface CarsState {
  cars: ICar[];
  car: ICar;
  optionsCars: SelectOption[];
  isLoading: boolean;
  isGetCars: boolean;
  error: string | null;
  successSend: boolean;
}

export interface IMessage {
  type: string;
  title: string;
  message: ReactNode | string;
  onConfirm?: () => void;
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
