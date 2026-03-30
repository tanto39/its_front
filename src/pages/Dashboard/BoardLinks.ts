import { UserRole } from "../../types/index";
import park from '../../assets/images/park.jpg';
import stat from '../../assets/images/stat.jpg';
import request from '../../assets/images/request.jpg';
import users from '../../assets/images/users.jpg';

export interface IBoardLinks {
  link: string;
  title: string;
  img: string;
  roles: UserRole[];
}

export const boardLinks: IBoardLinks[] = [
  { link: "/cars", title: "Автопарк", img: park, roles: ["user", "admin"] },
  { link: "/stat", title: "Статистика", img: stat, roles: ["user", "admin"] },
  { link: "/tech_requests", title: "Заявки на ТО", img: request, roles: ["user", "admin"] },
  { link: "/users", title: "Пользователи", img: users, roles: ["admin"] },
];
