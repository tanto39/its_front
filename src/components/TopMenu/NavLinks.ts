import React from "react";
import { UserRole } from "../../types/index";

export interface INavLinks {
  link: string;
  title: string;
  roles: UserRole[];
}

export const navLinks: INavLinks[] = [
  { link: "/", title: "Главная", roles: ["user", "admin"] },
  { link: "/cars", title: "Автопарк", roles: ["user", "admin"] },
  { link: "/stat", title: "Статистика", roles: ["user", "admin"] },
  { link: "/tech_requests", title: "Заявки на ТО", roles: ["user", "admin"] },
  { link: "/users", title: "Пользователи", roles: ["admin"] },
];
