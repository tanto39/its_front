import { IInputField } from "../../types/forms";

export const inputFields: IInputField[] = [
  {
    id: "login",
    type: "text",
    label: "Логин",
    placeholder: "Введите логин",
    disabled: true
  },
  {
    id: "second_name",
    type: "text",
    label: "Фамилия",
    placeholder: "Введите фамилию",
    required: true
  },
  {
    id: "first_name",
    type: "text",
    label: "Имя",
    placeholder: "Введите имя",
    required: true
  },
  {
    id: "middle_name",
    type: "text",
    label: "Отчество",
    placeholder: "Введите отчество"
  },
  {
    id: "password",
    type: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    required: false
  }
];