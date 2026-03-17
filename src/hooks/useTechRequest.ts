import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { setMessage } from "../store/slices/message";
import {
  clearSend,
  fetchTechRequest,
  updateTechRequest,
  deleteTechRequest,
  setCurrentTechRequest,
  createTechRequest,
} from "../store/slices/techRequestSlice";
import { ITechRequest, IMessage, IUrlParam, IUser, RequestType } from "../types/index";
import { useCars } from "./useCars";
import { useUsers } from "./useUsers";
import { SelectOption, techRequestForm } from "../types/forms";
import { clearStats } from "../store/slices/statsSlice";

export function useTechRequest() {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const optionsType: SelectOption[] = [
    { label: "ТО", value: "to" },
    { label: "Ремонт", value: "repair" },
  ];

  const { techRequest, isLoading, error, successSend } = useAppSelector((state) => state.techRequest);
  const { optionsCars } = useCars();
  const { optionsUsers } = useUsers();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<techRequestForm>();

  // Получаем значение car_id из формы
  const watchCar = watch("car_id");
  const watchPerson = watch("person");
  const watchType = watch("request_type");

  // Инициализируем selectedCar из формы или из currentTechRequest
  const [selectedCar, setSelectedCar] = useState<string | number>(watchCar || techRequest?.car_id || "");
  const [selectedPerson, setSelectedPerson] = useState<string | number>(
    watchPerson || techRequest?.person?.login || "",
  );
  const [selectedType, setSelectedType] = useState<string | number>(watchType || techRequest?.request_type || "to");

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) return;

    const paramsId: number = Number(params.id);
    if (paramsId === 0) {
      // Если заявка ещё не создана или её id не равен 0
      if (!techRequest || techRequest.request_id !== 0) {
        dispatch(setCurrentTechRequest({ request_id: 0 } as ITechRequest));
      }
    } else if (!techRequest || techRequest.request_id !== paramsId) {
      dispatch(fetchTechRequest(paramsId));
    }
    if (techRequest) {
      setValue("request_id", techRequest.request_id);
      setValue("date_repair", techRequest.date_repair);
      setValue("info", techRequest.info);
      if (techRequest.person?.login) {
        setValue("person", techRequest.person?.login);
        setSelectedPerson(techRequest.person?.login);
      }
      if (techRequest.car_id) {
        setValue("car_id", techRequest.car_id);
        setSelectedCar(techRequest.car_id);
      }
      if (techRequest.request_type) {
        setValue("request_type", techRequest.request_type);
        setSelectedType(techRequest.request_type);
      }
    }
  }, [dispatch, techRequest, setValue, params.id, isDeleting]);

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

  const onSubmit: SubmitHandler<techRequestForm> = async (formData) => {
    // Создаем объект данных для отправки в формате JSON
    const requestData: techRequestForm = {
      request_id: techRequest?.request_id || 0,
      request_type: selectedType as RequestType,
      car_id: selectedCar as number,
      person: String(selectedPerson),
      date_repair: formData.date_repair || "",
      info: formData.info || ""
    };

    await dispatch(clearStats());

    if (techRequest?.request_id == 0) {
      const resultAction = await dispatch(createTechRequest(requestData));
      // Проверяем, что действие выполнилось успешно
      if (createTechRequest.fulfilled.match(resultAction)) {
        const newTechRequest = resultAction.payload as ITechRequest;
        navigate(`/tech_requests/${newTechRequest.request_id}`);
      }
    } else {
      dispatch(updateTechRequest({ id: techRequest?.request_id as number, data: requestData }));
    }
  };

  const handleDelete = () => {
    if (techRequest?.request_id) {
      const confirmMessage: IMessage = {
        type: "C",
        title: "Подтверждение удаления",
        message: "Вы уверены, что хотите удалить эту заявку?",
        onConfirm: async () => {
          setIsDeleting(true); // блокируем дальнейшие запросы
          try {
            await dispatch(deleteTechRequest({ id: techRequest.request_id })).unwrap();
            await dispatch(clearStats());
            navigate("/tech_requests");
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
  };
}
