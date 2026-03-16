import React, { ChangeEvent } from "react";
import styles from "./FilterTechRequest.module.css";
import InputUI from "../UI/InputUI/InputUI";
import SelectUI from "../UI/SelectUI/SelectUI";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import {
  setRequestIdFilter,
  setRequestTypeFilter,
  setCarIdTechFilter,
  setPersonTechFilter,
  setDateRepairFilter,
  setSortTech,
  resetTechFilters,
} from "../../store/slices/filterTechRequestSlice";
import { IInputField } from "../../types/forms";

const FilterTechRequest: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterTechRequest);

  const requestTypeOptions = [
    { value: "all", label: "Все" },
    { value: "to", label: "ТО" },
    { value: "repair", label: "Ремонт" },
  ];

  const sortOptions = [
    { value: "name_asc", label: "По названию (возр.)" },
    { value: "name_desc", label: "По названию (уб.)" },
    { value: "date_repair_asc", label: "По дате ремонта (возр.)" },
    { value: "date_repair_desc", label: "По дате ремонта (уб.)" },
  ];

  const handleRequestIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRequestIdFilter(e.target.value));
  };

  const handleRequestTypeChange = (value: string | number) => {
    dispatch(setRequestTypeFilter(value as "all" | "to" | "repair"));
  };

  const handleCarIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCarIdTechFilter(e.target.value));
  };

  const handlePersonChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPersonTechFilter(e.target.value));
  };

  const handleDateRepairChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRepairFilter(e.target.value));
  };

  const handleSortChange = (value: string | number) => {
    dispatch(setSortTech(value as "name_asc" | "name_desc" | "date_repair_asc" | "date_repair_desc"));
  };

  const handleReset = () => {
    dispatch(resetTechFilters());
  };

  // Поля для InputUI
  const requestIdField: IInputField = {
    id: "filter_request_id",
    type: "number",
    label: "УИД заявки",
    placeholder: "Поиск по УИД заявки",
  };

  const carIdField: IInputField = {
    id: "filter_car_id_tech",
    type: "number",
    label: "УИД автомобиля",
    placeholder: "Поиск по УИД автомобиля",
  };

  const dateRepairField: IInputField = {
    id: "filter_date_repair",
    type: "date",
    label: "Дата ремонта",
    placeholder: "",
  };

  const personField: IInputField = {
    id: "filter_person_tech",
    type: "text",
    label: "Ответственное лицо",
    placeholder: "Поиск по ФИО, логину",
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterRow}>
        <InputUI field={requestIdField} value={filters.request_id} onChange={handleRequestIdChange} />
        <InputUI field={carIdField} value={filters.car_id} onChange={handleCarIdChange} />
        <InputUI field={dateRepairField} value={filters.date_repair} onChange={handleDateRepairChange} />
      </div>
      <div className={styles.filterRow}>
        <InputUI field={personField} value={filters.person} onChange={handlePersonChange} />
        <SelectUI
          options={requestTypeOptions}
          value={filters.request_type}
          onChange={handleRequestTypeChange}
          placeholder="Тип заявки"
          label="Тип заявки"
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

export default FilterTechRequest;
