import { ReactNode } from "react";
import { SelectOption } from "./forms.ts";

// Базовые типы данных
export interface IUser {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
  password?: string;
}

export type UserRole = "user" | "admin";

export interface AuthResponse {
  user: IUser;
  token?: string;
}

export interface IUnit {
  unit_id: number;
  name: string;
  car_id: number;
  date_repair: string;
  its: number;
  info: string;
  image_url: string;
}
export interface ICar {
  car_id: number;
  name: string;
  reg_number: string;
  date_tech: string;
  date_repair: string;
  milage: number;
  its: number;
  info: string;
  image_url?: string;
  person?: IUser;
  units?: IUnit[];
}

export type RequestType = "to" | "repair";

export interface ITechRequest {
  request_id: number,
  request_type: RequestType,
  car_id: number,
  date_repair: string,
  info: string,
  person?: IUser;
  car?: ICar;
}

export interface IStats {
  avgIts: number,
  totalCars: number,
  count70_100: number,
  count30_69: number,
  count0_29: number,
  totalRequests: number
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
  cars: ICar[] | null;
  car: ICar | null;
  optionsCars: SelectOption[];
  isLoading: boolean;
  isGetCars: boolean;
  error: string | null;
  successSend: boolean;
}

export interface UnitState {
  unit: IUnit | null;
  isLoading: boolean;
  error: string | null;
  successSend: boolean;
}

export interface TechRequestState {
  techRequests: ITechRequest[] | null;
  techRequest: ITechRequest | null;
  isLoading: boolean;
  isGetTechRequests: boolean;
  error: string | null;
  successSend: boolean;
}

export interface FilterState {
  name: string;
  reg_number: string;
  car_id: string;
  person: string;
  its: 'all' | '70-100' | '30-69' | '0-29';
  sort: 'name_asc' | 'name_desc' | 'its_asc' | 'its_desc';
}

export interface FilterTechRequestState {
  request_id: string,
  request_type: 'all' | 'to' | 'repair',
  car_id: string,
  date_repair: string,
  person: string;
  sort: 'name_asc' | 'name_desc' | 'date_repair_asc' | 'date_repair_desc';
}

export interface StatsState {
  stats: IStats | null;
  isLoading: boolean;
  error: string | null;
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

export type IUrlParam = {
  id: string;
};
