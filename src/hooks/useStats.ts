import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchStats } from "../store/slices/statsSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useStats() {
    const messageSet: IMessage = {} as IMessage;
  
    const { stats, isLoading, error } = useAppSelector((state) => state.stats);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!stats) {
        dispatch(fetchStats());
      }
    }, [dispatch, stats]);
  
    if (error) {
      messageSet.type = "E";
      messageSet.title = "Error";
      messageSet.message = error;
      dispatch(setMessage(messageSet));
    }

  return { stats, isLoading, error };
}