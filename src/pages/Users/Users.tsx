import React from "react";
import styles from "./Users.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import UsersItem from "../../components/UsersItem/UsersItem.tsx";
import { useUsers } from "../../hooks/useUsers";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";
import FilterUsers from "../../components/FilterUsers/FilterUsers";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { filteredSortedUsers, isLoading, error } = useUsers();

  return (
    <main className="pageWrap">
      <h1 className="heading">Пользователи</h1>
      <FilterUsers />
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <div className={styles.add}>
        <ButtonUI type="button" onClick={() => navigate('/user/0')}>
          Создать пользователя
        </ButtonUI>
      </div>
      <div className={styles.users}>
        {filteredSortedUsers?.map((user) => (
          <UsersItem key={user.login} user={user} />
        ))}
      </div>
    </main>
  );
};

export default Users;