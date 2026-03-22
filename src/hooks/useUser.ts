import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { setMessage } from "../store/slices/message";
import { clearSend, fetchUser, updateUser, deleteUser, setCurrentUser, createUser } from "../store/slices/usersSlice";
import { IUser, IMessage, IUrlParam, RequestType, UserRole } from "../types/index";
import { SelectOption, userForm } from "../types/forms";

export function useUser() {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const { user, isLoading, error, successSend } = useAppSelector((state) => state.users);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<userForm>();

  const optionsRole: SelectOption[] = [
    { label: "Пользователь", value: "user" },
    { label: "Администратор", value: "admin" },
  ];

  const [selectedRole, setSelectedRole] = useState<string | number>(watch("role_name") || user?.role_name || "user");

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) return;

    const login: string = params.id || "";
    if (login === "") {
      // Если пользователь ещё не создан или его login не задан
      if (!user || !user.login) {
        dispatch(setCurrentUser({ login: "" } as IUser));
      }
    } else if (!user || user.login !== login) {
      dispatch(fetchUser(login));
    }
    if (user) {
      setValue("login", user.login);
      setValue("second_name", user.second_name);
      setValue("first_name", user.first_name);
      if (user.middle_name) {
        setValue("middle_name", user.middle_name);
      }
      setValue("role_name", user.role_name);
      setSelectedRole(user.role_name);
    }
  }, [dispatch, user, setValue, params.id, isDeleting]);

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

  const onSubmit: SubmitHandler<userForm> = async (formData) => {
    // Создаем объект данных для отправки в формате JSON
    const requestData: IUser = {
      login: user?.login || "",
      second_name: formData.second_name || "",
      first_name: formData.first_name || "",
      middle_name: formData.middle_name || "",
      role_name: selectedRole as UserRole,
      password: formData.password || "",
    };

    if (!user || !user.login) {
      const resultAction = await dispatch(createUser(requestData));
      // Проверяем, что действие выполнилось успешно
      if (createUser.fulfilled.match(resultAction)) {
        const newUser = resultAction.payload as IUser;
        navigate(`/users/${newUser.login}`);
      }
    } else {
      dispatch(updateUser({ login: user.login, data: requestData }));
    }
  };

  const handleDelete = () => {
    if (user?.login) {
      const confirmMessage: IMessage = {
        type: "C",
        title: "Подтверждение удаления",
        message: "Вы уверены, что хотите удалить этого пользователя?",
        onConfirm: async () => {
          setIsDeleting(true); // блокируем дальнейшие запросы
          try {
            await dispatch(deleteUser({ login: user.login })).unwrap();
            navigate("/users");
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
    user,
    isLoading,
    error,
    currentUser,
    onSubmit,
    handleDelete,
    register,
    handleSubmit,
    selectedRole,
    setSelectedRole,
    optionsRole
  };
}
