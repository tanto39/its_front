import { SelectOption } from "../../types/forms";

export const optionsStatus: SelectOption[] = [
  { label: "Новый", value: "new" },
  { label: "В процессе", value: "process" },
  { label: "Выполнено", value: "done" },
];

export const optionsType: SelectOption[] = [
  { label: "ТО", value: "to" },
  { label: "Ремонт", value: "repair" },
];