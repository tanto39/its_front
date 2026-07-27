import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { setMessage } from "../store/slices/message.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendAuth } from "../store/slices/authSlice";
import { LoginFormData } from "../types/forms";
import { IMessage } from "../types/index";

export function useLogin() {
  const navigate = useNavigate();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (error) {
      const messageSet: IMessage = {} as IMessage;
      messageSet.type = "E";
      messageSet.title = "Error";
      messageSet.message = error;
      dispatch(setMessage(messageSet));
    }
  }, [user, navigate, error, dispatch]);

  const { register, handleSubmit, getValues, formState } = useForm<LoginFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmitAuth = async () => {
    const data = getValues();
    dispatch(sendAuth(data));
  };

  return { register, handleSubmit, onSubmitAuth, isLoading, error, formState };
}
