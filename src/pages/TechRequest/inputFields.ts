import { IInputField } from "../../types/forms";

export const inputFields: IInputField[] = [
  {
    id: "request_id",
    type: "number",
    label: "УИД заявки",
    placeholder: "",
    disabled: true
  },
  {
    id: "date_repair",
    type: "date",
    label: "Дата ремонта",
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
