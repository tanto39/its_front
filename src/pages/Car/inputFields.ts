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
  },
  {
    id: "reg_number",
    type: "text",
    label: "Регистрационный номер",
    placeholder: "123AB46",
    required: true,
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
