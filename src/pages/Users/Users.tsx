import React from "react";
import styles from "./Users.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import UsersItem from "../../components/UsersItem/UsersItem.tsx";
import { useUsers } from "../../hooks/useUsers";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";
import FilterUsers from "../../components/FilterUsers/FilterUsers";
import Pagination from "../../components/Pagination/Pagination";
import { usePaginate } from "../../hooks/usePaginate";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { filteredSortedUsers, isLoading, error } = useUsers();

  const { paginatedData, totalPages, currentPage, goToPage } = usePaginate(filteredSortedUsers || []);

  return (
    <main className="pageWrap">
      <h1 className="heading">Пользователи</h1>
      <FilterUsers />
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <div className={styles.add}>
        <ButtonUI type="button" onClick={() => navigate("/users/0")}>
          Создать пользователя
        </ButtonUI>
      </div>
      <div className={styles.users}>
        {paginatedData.map((user) => (
          <UsersItem key={user.login} user={user} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
    </main>
  );
};

export default Users;
