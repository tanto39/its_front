import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { setMessage } from "../store/slices/message";
import { clearSend, fetchUnit, updateUnit, deleteUnit, setCurrentUnit, createUnit } from "../store/slices/unitSlice";
import { unitFormData } from "../types/forms";
import { IUnit, IMessage, IUrlParam } from "../types/index";
import { useCars } from "./useCars";
import { clearCurrentCar } from "../store/slices/carsSlice";

export function useUnit() {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const { unit, isLoading, error, successSend } = useAppSelector((state) => state.unit);
  const { optionsCars } = useCars();
  const { user } = useAppSelector((state) => state.auth);
  const { car } = useAppSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const formMethods = useForm<unitFormData>();
  const { register, handleSubmit, getValues, setValue, watch } = formMethods;

  // Получаем значение car_id из формы
  const watchCar = watch("car_id");

  // Инициализируем selectedCar из carSlice
  const [selectedCar, setSelectedCar] = useState<string | number>(car?.car_id || watchCar || unit?.car_id || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) return;

    const paramsId: number = Number(params.id);
    if (paramsId === 0) {
      // Если агрегат ещё не создан или его id не равен 0
      if (!unit || unit.unit_id !== 0) {
        dispatch(setCurrentUnit({ unit_id: 0 } as IUnit));
      }
    } else if (!unit || unit.unit_id !== paramsId) {
      dispatch(fetchUnit(paramsId));
    }
    if (unit) {
      setValue("unit_id", unit.unit_id);
      setValue("name", unit.name);
      setValue("date_repair", unit.date_repair);
      setValue("its", unit.its);
      setValue("info", unit.info);
      if (unit.car_id) {
        setValue("car_id", String(unit.car_id));
        setSelectedCar(unit.car_id);
      }
    }
  }, [dispatch, unit, setValue, params.id, car, isDeleting]);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Error";
    messageSet.message = `${error}`;
    dispatch(setMessage(messageSet));
  }

  if (successSend) {
    messageSet.type = "S";
    messageSet.title = "Сохранено";
    messageSet.message = "Изменения сохранены.";
    dispatch(clearSend());
    dispatch(setMessage(messageSet));
  }

  const onSubmit: SubmitHandler<unitFormData> = async (formData) => {
    const formDataToSend = new FormData();

    // Добавляем все поля формы
    formDataToSend.append("name", formData.name);
    formDataToSend.append("date_repair", formData.date_repair || "");
    formDataToSend.append("its", String(formData.its || ""));
    formDataToSend.append("info", formData.info || "");
    formDataToSend.append("car_id", selectedCar as string);

    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    }

    if (unit?.unit_id === 0) {
      // Создание нового агрегата
      await dispatch(createUnit(formDataToSend)).unwrap();
    } else {
      // Обновление существующего
      await dispatch(updateUnit({ id: unit!.unit_id, formData: formDataToSend })).unwrap();
    }

    dispatch(clearCurrentCar());
    navigate(`/cars/${selectedCar}`);
  };

  const handleDelete = () => {
    if (unit?.unit_id) {
      const confirmMessage: IMessage = {
        type: "C",
        title: "Подтверждение удаления",
        message: "Вы уверены, что хотите удалить этот агрегат?",
        onConfirm: async () => {
          setIsDeleting(true); // блокируем дальнейшие запросы
          try {
            await dispatch(deleteUnit({ id: unit.unit_id })).unwrap();
            dispatch(clearCurrentCar());
            navigate(`/cars/${unit.car_id}`);
          } catch (err) {
            console.error("Ошибка удаления:", err);
            setIsDeleting(false); // при ошибке снимаем блокировку
          }
        },
      };
      dispatch(setMessage(confirmMessage));
    }
  };

  return {
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
  };
}
