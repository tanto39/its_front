import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchCars } from "../store/slices/carsSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useCars() {
    const messageSet: IMessage = {} as IMessage;
  
    const { cars, optionsCars, isLoading, isGetCars, error } = useAppSelector((state) => state.cars);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!isGetCars) {
        dispatch(fetchCars());
      }
    }, [dispatch, cars, isGetCars]);
  
    if (error) {
      messageSet.type = "E";
      messageSet.title = "Error";
      messageSet.message = error;
      dispatch(setMessage(messageSet));
    }
    
  return { cars, optionsCars, isLoading, error };
}