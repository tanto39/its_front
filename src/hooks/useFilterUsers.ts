import { useMemo } from "react";
import { useAppSelector } from "../store/helpers";
import { IUser } from "../types";

export const useFilterUsers = (users: IUser[] | null) => {
  const filters = useAppSelector((state) => state.filterUsers);

  const filteredSortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    const filtered = users.filter((user) => {
      // Фильтр по person (поиск по login, first_name, second_name, middle_name)
      if (filters.person) {
        const personStr =
          `${user.login} ${user.first_name} ${user.second_name} ${user.middle_name || ""}`.toLowerCase();
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
            return a.first_name.localeCompare(b.second_name);
          case "name_desc":
            return b.first_name.localeCompare(a.second_name);
           case "login_asc":
            return a.login.localeCompare(b.login);
          case "login_desc":
            return b.login.localeCompare(a.login);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [users, filters]);

  return filteredSortedUsers;
};