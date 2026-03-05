import { IInputField } from "../../types/forms";

export const unitInputFields: IInputField[] = [
  {
    id: "unit_id",
    type: "number",
    label: "УИД сборочной единицы",
    placeholder: "",
    disabled: true
  },
  {
    id: "name",
    type: "text",
    label: "Название",
    placeholder: "Название",
    required: true,
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
    customClassName: 'inputUI__textarea'
  },
];
