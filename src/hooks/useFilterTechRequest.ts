import { useMemo } from "react";
import { useAppSelector } from "../store/helpers";
import { ITechRequest } from "../types";

export const useFilterTechRequest = (techRequests: ITechRequest[] | null) => {
  const filters = useAppSelector((state) => state.filterTechRequest);

  const filteredSortedTechRequests = useMemo(() => {
    if (!techRequests || techRequests.length === 0) return [];

    const filtered = techRequests.filter((request) => {
      // Фильтр по request_id
      if (filters.request_id && !String(request.request_id).includes(filters.request_id)) {
        return false;
      }
      // Фильтр по request_type
      if (filters.request_type !== 'all' && request.request_type !== filters.request_type) {
        return false;
      }
      // Фильтр по car_id
      if (filters.car_id && !String(request.car_id).includes(filters.car_id)) {
        return false;
      }
      // Фильтр по date_repair
      if (filters.date_repair && request.date_repair) {
        const filterDate = new Date(filters.date_repair);
        const requestDate = new Date(request.date_repair);
        if (filterDate.setHours(0,0,0,0) !== requestDate.setHours(0,0,0,0)) {
          return false;
        }
      }
      // Фильтр по person (поиск по login, first_name, second_name, middle_name)
      if (filters.person) {
        if (!request.person) return false;
        const personStr =
          `${request.person.login} ${request.person.first_name} ${request.person.second_name} ${request.person.middle_name || ""}`.toLowerCase();
        if (!personStr.includes(filters.person.toLowerCase())) {
          return false;
        }
      }
      return true;
    });

    // Сортировка
    if (filters.sort) {
      filtered.sort((a, b) => {
        switch (filters.sort) {
          case "name_asc":
            return a.request_id - b.request_id;
          case "name_desc":
            return b.request_id - a.request_id;
          case "date_repair_asc":
            return new Date(a.date_repair).getTime() - new Date(b.date_repair).getTime();
          case "date_repair_desc":
            return new Date(b.date_repair).getTime() - new Date(a.date_repair).getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [techRequests, filters]);

  return filteredSortedTechRequests;
};
