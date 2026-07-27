import { IInputField } from "../../types/forms";

export const inputFields: IInputField[] = [
  {
    id: "login",
    type: "text",
    label: "Логин",
    placeholder: "Введите логин",
    required: true,
    validation: {
      required: "Логин обязателен",
      maxLength: {
        value: 32,
        message: "Длина не должна превышать 32 символа",
      },
      minLength: {
        value: 8,
        message: "Длина не меньше 8 символов",
      },
    },
  },
  {
    id: "second_name",
    type: "text",
    label: "Фамилия",
    placeholder: "Введите фамилию",
    required: true,
    validation: {
      required: "Фамилия обязательна",
    },
  },
  {
    id: "first_name",
    type: "text",
    label: "Имя",
    placeholder: "Введите имя",
    required: true,
    validation: {
      required: "Имя обязательно",
    },
  },
  {
    id: "middle_name",
    type: "text",
    label: "Отчество",
    placeholder: "Введите отчество",
  },
  {
    id: "password",
    type: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    required: false,
    validation: {
      required: "Пароль обязателен",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 
        message: "Пароль должен содержать минимум 8 символов, заглавную, строчную букву, спецсимвол",
      },
    },
  },
];
