import React, { useEffect, useState } from "react";
import styles from "./Car.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { setMessage } from "../../store/slices/message";
import { clearSend, fetchCar, updateCar } from "../../store/slices/carsSlice";
import { carFormData } from "../../types/forms";
import { ICar, IMessage, IUrlParam, IUser } from "../../types/index";
import { inputFields } from "./inputFields";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { useUsers } from "../../hooks/useUsers";
import { Its } from "../../components/UI/Its/Its";

const Car: React.FC = () => {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const { car, isLoading, error, successSend } = useAppSelector((state) => state.cars);
  const { optionsUsers } = useUsers();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<carFormData>();

  // Получаем значение id_medical_profile из формы
  const watchPerson = watch("person_login");

  // Инициализируем selectedProfile из формы или из currentDoctor
  const [selectedPerson, setSelectedPerson] = useState<string | number>(watchPerson || car.person?.login || "");

  useEffect(() => {
    const paramsId: number = Number(params.id);
    if (!car.car_id || paramsId !== car.car_id) {
      dispatch(fetchCar(paramsId));
    }
    if (car) {
      setValue("car_id", car.car_id);
      setValue("name", car.name);
      setValue("reg_number", car.reg_number);
      setValue("date_tech", car.date_tech);
      setValue("date_repair", car.date_repair);
      setValue("milage", car.milage);
      setValue("its", car.its);
      setValue("info", car.info);
      if (car.person?.login) {
        setValue("person_login", car.person.login);
        setSelectedPerson(car.person.login);
      }
    }
  }, [dispatch, car, setValue, params.id]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Error";
    messageSet.message = <p>{error}</p>;
    dispatch(setMessage(messageSet));
  }

  if (successSend) {
    messageSet.type = "S";
    messageSet.title = "Сохранено";
    messageSet.message = (
      <div>
        <p>Изменения сохранены.</p>
      </div>
    );
    dispatch(clearSend());
    dispatch(setMessage(messageSet));
  }

  const onSubmit: SubmitHandler<carFormData> = async (formData) => {
    const carData: ICar = { ...formData, person: { login: selectedPerson as string } as IUser };
    dispatch(updateCar({ id: car?.car_id as number, data: carData }));
  };

  return (
    <main className={styles.carPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {car && (
        <div className="pageWrap">
          <h1 className="heading">
            {car.name} {car.car_id}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {inputFields.map((field) => (
                <InputUI key={field.id} field={field} register={register} />
              ))}

              <SelectUI
                options={optionsUsers}
                value={selectedPerson}
                onChange={setSelectedPerson}
                placeholder="Ответственное лицо"
                searchPlaceholder="Поиск"
                label="Ответственное лицо"
              />

              <Its its_val={car.its} register={register}/>

              <div className={styles.saveButton}>
                <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                  Сохранить
                </ButtonUI>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Car;
