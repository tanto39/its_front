import React from "react";
import styles from "./Unit.module.css";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { unitInputFields } from "./inputFields";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { Its } from "../../components/UI/Its/Its";
import ImageBlock from "../../components/UI/ImageBlock/ImageBlock";
import { useUnit } from "../../hooks/useUnit";
import { useAppSelector } from "../../store/helpers";

const Unit: React.FC = () => {
  const {
    unit,
    optionsCars,
    isLoading,
    error,
    user,
    onSubmit,
    handleDelete,
    handleFileSelect,
    register,
    handleSubmit,
    selectedCar,
    setSelectedCar,
  } = useUnit();

  const { car } = useAppSelector((state) => state.cars);

  return (
    <main className={styles.unitPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {unit && user && (
        <div className="pageWrap">
          <h1 className="heading">
            {unit.name} {unit.unit_id > 0 ? unit.unit_id : "Добавление агрегата"}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {unitInputFields.map((field) => (
                <InputUI
                  key={field.id}
                  field={{
                    ...field,
                    disabled: (user.role_name !== "admin" && car.person?.login !== user.login) ? true : field.disabled,
                  }}
                  register={register}
                />
              ))}

              <SelectUI
                options={optionsCars}
                value={selectedCar}
                onChange={setSelectedCar}
                placeholder="Автомобиль"
                searchPlaceholder="Поиск"
                label="Автомобиль"
                disabled={(user.role_name !== "admin" && car.person?.login !== user.login) ? true : false}
              />

              <Its its_val={unit.its} />

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
                </div>
              )}
            </form>

            <ImageBlock imageUrl={unit.image_url} onFileSelect={handleFileSelect} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Unit;