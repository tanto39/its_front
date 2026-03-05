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
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<unitFormData>();

  // Получаем значение car_id из формы
  const watchCar = watch("car_id");

  // Инициализируем selectedCar из формы или из unit
  const [selectedCar, setSelectedCar] = useState<string | number>(watchCar || unit?.car_id || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
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
  }, [dispatch, unit, setValue, params.id]);

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

    if (unit?.unit_id == 0) {
      const resultAction = await dispatch(createUnit(formDataToSend));
      // Проверяем, что действие выполнилось успешно
      if (createUnit.fulfilled.match(resultAction)) {
        const newUnit = resultAction.payload as IUnit;
        navigate(`/units/${newUnit.unit_id}`);
      }
    } else {
      dispatch(updateUnit({ id: unit?.unit_id as number, formData: formDataToSend }));
    }
  };

  const handleDelete = () => {
    if (unit?.unit_id) {
      const confirmMessage: IMessage = {
        type: "C",
        title: "Подтверждение удаления",
        message: "Вы уверены, что хотите удалить этот агрегат?",
        onConfirm: () => {
          dispatch(deleteUnit({ id: unit.unit_id }));
          dispatch(clearCurrentCar());
          navigate(`/cars/${unit.car_id}`);
        },
      };
      dispatch(setMessage(confirmMessage));
    }
  };

  return {
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
    setSelectedCar
  };
}
