import React, { ChangeEvent } from "react";
import styles from "./FilterUsers.module.css";
import InputUI from "../UI/InputUI/InputUI";
import SelectUI from "../UI/SelectUI/SelectUI";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { setPersonFilter, setSortUsers, resetUsersFilters } from "../../store/slices/filterUsersSlice";
import { IInputField } from "../../types/forms";

const FilterUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterUsers);

  const sortOptions = [
    { value: "name_asc", label: "По имени (возр.)" },
    { value: "name_desc", label: "По имени (уб.)" },
    { value: "login_asc", label: "По логину(возр.)" },
    { value: "login_desc", label: "По логину (уб.)" },
  ];

  const handlePersonChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPersonFilter(e.target.value));
  };

  const handleSortChange = (value: string | number) => {
    dispatch(setSortUsers(value as "name_asc" | "name_desc" | "login_asc" | "login_desc"));
  };

  const handleReset = () => {
    dispatch(resetUsersFilters());
  };

  // Поле для InputUI
  const personField: IInputField = {
    id: "filter_person_users",
    type: "text",
    label: "ФИО / Логин",
    placeholder: "Поиск по ФИО, логину",
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterRow}>
        <InputUI field={personField} value={filters.person} onChange={handlePersonChange} />
        <SelectUI
          options={sortOptions}
          value={filters.sort}
          onChange={handleSortChange}
          placeholder="Сортировка"
          label="Сортировка"
        />
        <div>
          <div className={styles.filterButton}>
            <ButtonUI type="button" onClick={handleReset}>
              Сбросить фильтры
            </ButtonUI>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterUsers;
