import React from "react";
import styles from "./UsersItem.module.css";
import { IUser } from "../../types";
import { useNavigate } from "react-router-dom";

interface UsersItemProps {
  user: IUser;
}

const UsersItem: React.FC<UsersItemProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.user} onClick={() => navigate(`/users/${user.login}`)}>
      <h3 className={styles.user__title}>{user.second_name} {user.first_name} {user.middle_name}</h3>
      <div className={styles.user__info}>
        <img className={styles.user__img} src="/public/images/person.svg" alt="Логин" />
        <span className={styles.user__text}>{user.login}</span>
      </div>
      <div className={styles.user__info}>
        <img className={styles.user__img} src="/public/images/span.svg" alt="Роль" />
        <span className={styles.user__text}>{user.role_name === "admin" ? "Администратор" : "Пользователь"}</span>
      </div>
    </div>
  );
};

export default UsersItem;