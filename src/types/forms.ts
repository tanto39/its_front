import { UserRole } from "./index.ts";

// Типы для форм
export interface IInputField {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  customClassName?: string;
  disabled?: boolean;
  roles?: UserRole[];
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
  name: string;
}
