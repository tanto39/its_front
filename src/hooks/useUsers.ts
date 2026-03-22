import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchUsers } from "../store/slices/usersSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";
import { useFilterUsers } from "./useFilterUsers";

export function useUsers() {
  const { users, optionsUsers, isLoading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  const filteredSortedUsers = useFilterUsers(users);

  return { users, filteredSortedUsers, optionsUsers, isLoading, error };
}