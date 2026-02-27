import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchUsers } from "../store/slices/usersSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useUsers() {
  const { users, optionsUsers, isLoading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  return { users, optionsUsers, isLoading, error };
}