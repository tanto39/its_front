import { RequestType, UserRole } from "./index.ts";

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
  max?: number;
  min?: number;
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
  person: string,
}

export interface techRequestForm {
  request_id: number,
  request_type: string,
  car_id: number,
  date_repair: string,
  info: string,
  person: string;
}

export interface unitFormData {
  unit_id: number,
  name: string,
  car_id: string,
  date_repair: string,
  its: number,
  info: string,
}
