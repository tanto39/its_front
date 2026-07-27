import { IInputField } from "../../types/forms";

export const unitInputFields: IInputField[] = [
  {
    id: "unit_id",
    type: "number",
    label: "УИД сборочной единицы",
    placeholder: "",
    disabled: true,
  },
  {
    id: "name",
    type: "text",
    label: "Название",
    placeholder: "Название",
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
    id: "date_repair",
    type: "date",
    label: "Дата последнего ремонта",
    placeholder: "",
    customClassName: "inputUI__date",
  },
  {
    id: "info",
    type: "text",
    label: "Информация",
    placeholder: "",
    is_textarea: true,
    customClassName: "inputUI__textarea",
  },
];
