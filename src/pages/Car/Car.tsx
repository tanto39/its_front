import React from "react";
import styles from "./Car.module.css";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { inputFields } from "./inputFields";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { Its } from "../../components/UI/Its/Its";
import Units from "../../components/Units/Units";
import ImageBlock from "../../components/UI/ImageBlock/ImageBlock";
import { useCar } from "../../hooks/useCar";

const Car: React.FC = () => {
  const {
    car,
    optionsUsers,
    isLoading,
    error,
    user,
    onSubmit,
    handleDelete,
    handleFileSelect,
    register,
    handleSubmit,
    selectedPerson,
    setSelectedPerson,
  } = useCar();

  return (
    <main className={styles.carPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {car && user && (
        <div className="pageWrap">
          <h1 className="heading">
            {car.name} {car.car_id > 0 ? car.car_id : "Добавление автомобиля"}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {inputFields.map((field) => (
                <InputUI
                  key={field.id}
                  field={{
                    ...field,
                    disabled: user.role_name !== "admin" && car.person?.login !== user.login ? true : field.disabled,
                  }}
                  register={register}
                />
              ))}

              <SelectUI
                options={optionsUsers}
                value={selectedPerson}
                onChange={setSelectedPerson}
                placeholder="Ответственное лицо"
                searchPlaceholder="Поиск"
                label="Ответственное лицо"
                disabled={user.role_name !== "admin" && car.person?.login !== user.login ? true : false}
              />

              <Its its_val={car.its} />

              {(user.role_name == "admin" || car.person?.login == user.login) && (
                <div className={styles.buttonsBottom}>
                  <div className={styles.saveButton}>
                    <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                      Сохранить
                    </ButtonUI>
                  </div>
                  <div className={styles.saveButton}>
                    <ButtonUI type="button" onClick={handleDelete}>
                      Удалить
                    </ButtonUI>
                  </div>
                  <div className={styles.techRequestButton}>
                    <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                      Запись на ТО и ремонт
                    </ButtonUI>
                  </div>
                </div>
              )}
            </form>

            <ImageBlock imageUrl={car.image_url} onFileSelect={handleFileSelect} />
          </div>

          {car.units && <Units units={car.units} />}
        </div>
      )}
    </main>
  );
};

export default Car;
