import { optionsStatus, optionsType } from "../pages/TechRequest/options";
import { ITechRequest } from "../types";

export const useTechRequestItem = (techRequest: ITechRequest) => {
  // Статус
  const statusOption = optionsStatus.find((opt) => opt.value === techRequest.status);
  const statusLabel = statusOption ? statusOption.label : techRequest.status;

  // Тип
  const typeOption = optionsType.find((opt) => opt.value === techRequest.request_type);
  const typeLabel = typeOption ? typeOption.label : techRequest.request_type;

  const formattedDate = new Date(techRequest.date_repair).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const personFullName = techRequest.person
    ? `${techRequest.person.second_name} ${techRequest.person.first_name} ${techRequest.person.middle_name}`
    : "";

  const carName = techRequest.car?.name || "";

  return {
    requestId: techRequest.request_id,
    typeLabel,
    carName,
    carId: techRequest.car_id,
    personFullName,
    formattedDate,
    statusLabel,
  };
};
