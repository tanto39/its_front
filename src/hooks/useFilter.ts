import { useMemo } from "react";
import { useAppSelector } from "../store/helpers";
import { ICar } from "../types";

export const useFilter = (cars: ICar[] | null) => {
  const filters = useAppSelector((state) => state.filter);

  const filteredSortedCars = useMemo(() => {
    if (!cars || cars.length === 0) return [];

    const filtered = cars.filter((car) => {
      // Фильтр по name
      if (filters.name && !car.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      // Фильтр по reg_number
      if (filters.reg_number && !car.reg_number?.toLowerCase().includes(filters.reg_number.toLowerCase())) {
        return false;
      }
      // Фильтр по car_id (поиск по строке)
      if (filters.car_id && !String(car.car_id).includes(filters.car_id)) {
        return false;
      }
      // Фильтр по person (поиск по login, first_name, second_name, middle_name)
      if (filters.person) {
        if (!car.person) return false;
        const personStr =
          `${car.person.login} ${car.person.first_name} ${car.person.second_name} ${car.person.middle_name || ""}`.toLowerCase();
        if (!personStr.includes(filters.person.toLowerCase())) {
          return false;
        }
      }
      // Фильтр по its диапазону
      if (filters.its !== "all") {
        const [min, max] = filters.its.split("-").map(Number);
        if (car.its === null || car.its === undefined) return false;
        if (car.its < min || car.its > max) return false;
      }
      return true;
    });

    // Сортировка
    if (filters.sort) {
      filtered.sort((a, b) => {
        switch (filters.sort) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "its_asc":
            return (a.its ?? 0) - (b.its ?? 0);
          case "its_desc":
            return (b.its ?? 0) - (a.its ?? 0);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [cars, filters]);

  return filteredSortedCars;
};
