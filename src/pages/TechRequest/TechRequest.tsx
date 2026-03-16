import React from "react";
import styles from "./TechRequest.module.css";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { inputFields } from "./inputFields";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { useTechRequest } from "../../hooks/useTechRequest";

const TechRequest: React.FC = () => {
  const {
    techRequest,
    optionsCars,
    optionsUsers,
    isLoading,
    error,
    user,
    onSubmit,
    handleDelete,
    register,
    handleSubmit,
    selectedCar,
    setSelectedCar,
    selectedPerson,
    setSelectedPerson,
    selectedType,
    setSelectedType,
    optionsType
  } = useTechRequest();

  return (
    <main className={styles.techRequestPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {techRequest && user && (
        <div className="pageWrap">
          <h1 className="heading">
            Заявка на {techRequest.request_type === "to" ? "ТО" : "ремонт"}{" "}
            {techRequest.request_id > 0 ? techRequest.request_id : "Добавление заявки"}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {inputFields.map((field) => (
                <InputUI
                  key={field.id}
                  field={{
                    ...field,
                    disabled:
                      user.role_name !== "admin" && techRequest.person?.login !== user.login ? true : field.disabled,
                  }}
                  register={register}
                />
              ))}

              <SelectUI
                options={optionsType}
                value={selectedType}
                onChange={setSelectedType}
                placeholder="Тип заявки"
                searchPlaceholder="Поиск"
                label="Тип заявки"
                disabled={user.role_name !== "admin" && techRequest.person?.login !== user.login ? true : false}
              />

              <SelectUI
                options={optionsCars}
                value={selectedCar}
                onChange={setSelectedCar}
                placeholder="Автомобиль"
                searchPlaceholder="Поиск по названию"
                label="Автомобиль"
                disabled={user.role_name !== "admin" && techRequest.person?.login !== user.login ? true : false}
              />

              <SelectUI
                options={optionsUsers}
                value={selectedPerson}
                onChange={setSelectedPerson}
                placeholder="Выберите сотрудника"
                searchPlaceholder="Поиск по ФИО"
                label="Сотрудник"
                disabled={user.role_name !== "admin" && techRequest.person?.login !== user.login ? true : false}
              />

              {(user.role_name === "admin" || techRequest.person?.login === user.login) && (
                <div className={styles.buttonsBottom}>
                  <div className={styles.saveButton}>
                    <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                      Сохранить
                    </ButtonUI>
                  </div>
                  <div className={styles.deleteButton}>
                    <ButtonUI type="button" onClick={handleDelete}>
                      Удалить
                    </ButtonUI>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default TechRequest;
