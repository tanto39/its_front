import React, { ChangeEvent } from "react";
import styles from "./Filter.module.css";
import InputUI from "../UI/InputUI/InputUI";
import SelectUI from "../UI/SelectUI/SelectUI";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import {
  setNameFilter,
  setRegNumberFilter,
  setCarIdFilter,
  setPersonFilter,
  setItsFilter,
  setSort,
  resetFilters,
} from "../../store/slices/filterSlice";
import { IInputField } from "../../types/forms";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const itsOptions = [
    { value: "all", label: "Все" },
    { value: "70-100", label: "70-100 Исправен" },
    { value: "30-69", label: "30-69 Требуется ТО" },
    { value: "0-29", label: "0-29 Отказ" },
  ];

  const sortOptions = [
    { value: "name_asc", label: "По названию (возр.)" },
    { value: "name_desc", label: "По названию (уб.)" },
    { value: "its_asc", label: "По ITS (возр.)" },
    { value: "its_desc", label: "По ITS (уб.)" },
  ];

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleRegNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegNumberFilter(e.target.value));
  };

  const handleCarIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCarIdFilter(e.target.value));
  };

  const handlePersonChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPersonFilter(e.target.value));
  };

  const handleItsChange = (value: string | number) => {
    dispatch(setItsFilter(value as "all" | "70-100" | "30-69" | "0-29"));
  };

  const handleSortChange = (value: string | number) => {
    dispatch(setSort(value as "name_asc" | "name_desc" | "its_asc" | "its_desc"));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Поля для InputUI
  const nameField: IInputField = {
    id: "filter_name",
    type: "text",
    label: "Название",
    placeholder: "Поиск по названию",
  };

  const regNumberField: IInputField = {
    id: "filter_reg_number",
    type: "text",
    label: "Госномер",
    placeholder: "Поиск по госномеру",
  };

  const carIdField: IInputField = {
    id: "filter_car_id",
    type: "number",
    label: "УИД автомобиля",
    placeholder: "Поиск по УИД",
  };

  const personField: IInputField = {
    id: "filter_person",
    type: "text",
    label: "Ответственное лицо",
    placeholder: "Поиск по ФИО, логину",
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterRow}>
        <InputUI field={nameField} value={filters.name} onChange={handleNameChange} />
        <InputUI field={regNumberField} value={filters.reg_number} onChange={handleRegNumberChange} />
        <InputUI field={carIdField} value={filters.car_id} onChange={handleCarIdChange} />
      </div>
      <div className={styles.filterRow}>
        <InputUI field={personField} value={filters.person} onChange={handlePersonChange} />
        <SelectUI
          options={itsOptions}
          value={filters.its}
          onChange={handleItsChange}
          placeholder="ITS"
          label="Индекс тех. состояния"
        />
        <SelectUI
          options={sortOptions}
          value={filters.sort}
          onChange={handleSortChange}
          placeholder="Сортировка"
          label="Сортировка"
        />
      </div>
      <div className={styles.filterButton}>
        <ButtonUI type="button" onClick={handleReset}>
          Сбросить фильтры
        </ButtonUI>
      </div>
    </div>
  );
};

export default Filter;
