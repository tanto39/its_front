import { UserRole } from "./index.ts";

// Типы для форм
export interface IInputField {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  customClassName?: string;
  disabled?: boolean;
  required?: boolean;
  is_textarea?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface LoginFormData {
  login: string;
  password: string;
}

export interface carFormData {
  car_id: number,
  name: string,
  reg_number: string,
  date_tech: string,
  date_repair: string,
  milage: number,
  its: number,
  info: string,
  person_login: string,
}
