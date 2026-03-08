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
import { FormProvider } from "react-hook-form";

const Unit: React.FC = () => {
  const {
    unit,
    car,
    optionsCars,
    isLoading,
    error,
    user,
    onSubmit,
    handleDelete,
    handleFileSelect,
    formMethods,
    selectedCar,
    setSelectedCar,
  } = useUnit();

  return (
    <main className={styles.unitPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {unit && user && (
        <div className="pageWrap">
          <h1 className="heading">
            {unit.name} {unit.unit_id > 0 ? unit.unit_id : "Добавление сборочной единицы"}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {unitInputFields.map((field) => (
                <InputUI
                  key={field.id}
                  field={{
                    ...field,
                    disabled: user.role_name !== "admin" && car?.person?.login !== user.login ? true : field.disabled,
                  }}
                  register={formMethods.register}
                />
              ))}

              <SelectUI
                options={optionsCars}
                value={selectedCar}
                onChange={setSelectedCar}
                placeholder="Автомобиль"
                searchPlaceholder="Поиск"
                label="Автомобиль"
                disabled={user.role_name !== "admin" && car?.person?.login !== user.login ? true : false}
              />

              <FormProvider {...formMethods}>
                <Its register={formMethods.register} />
              </FormProvider>

              {(user.role_name == "admin" || car?.person?.login == user.login) && (
                <div className={styles.buttonsBottom}>
                  <div className={styles.saveButton}>
                    <ButtonUI type="button" onClick={formMethods.handleSubmit(onSubmit)}>
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
