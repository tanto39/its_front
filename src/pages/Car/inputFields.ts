import { IInputField } from "../../types/forms";

export const inputFields: IInputField[] = [
  {
    id: "car_id",
    type: "number",
    label: "УИД автомобиля",
    placeholder: "",
    disabled: true
  },
  {
    id: "name",
    type: "text",
    label: "Название (модель)",
    placeholder: "Название (модель)",
    required: true,
    validation: {
      required: "Название обязательно",
      maxLength: {
        value: 32,
        message: "Название не должно превышать 32 символа",
      },
    },
  },
  {
    id: "reg_number",
    type: "text",
    label: "Регистрационный номер",
    placeholder: "123AB46",
    required: true,
    validation: {
      required: "Регистрационный номер обязателен",
      pattern: {
        value: /^[A-ZА-Я]{1}[0-9]{3}[A-ZА-Я]{2}$/i, // пример: A123AA
        message: "Формат: 1 буква, 3 цифры, 2 буквы",
      },
    },
  },
  {
    id: "date_tech",
    type: "date",
    label: "Дата последнего ТО",
    placeholder: "",
    customClassName: "inputUI__date",
  },
  {
    id: "date_repair",
    type: "date",
    label: "Дата последнего ремонта",
    placeholder: "",
    customClassName: "inputUI__date",
  },
  {
    id: "milage",
    type: "number",
    label: "Пробег (км)",
    placeholder: "",
  },
  {
    id: "info",
    type: "text",
    label: "Информация",
    placeholder: "",
    is_textarea: true,
    customClassName: 'inputUI__textarea'
  },
];
