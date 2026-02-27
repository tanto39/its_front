import { UserRole } from "../../types/index";

export interface IBoardLinks {
  link: string;
  title: string;
  img: string;
  roles: UserRole[];
}

export const boardLinks: IBoardLinks[] = [
  { link: "/cars", title: "Автопарк", img: "/public/images/park.jpg", roles: ["user", "admin"] },
  { link: "/stat", title: "Статистика", img: "/public/images/stat.jpg", roles: ["user", "admin"] },
  { link: "/tech_requests", title: "Заявки на ТО", img: "/public/images/kamaz-dv.jpg", roles: ["user", "admin"] },
];
