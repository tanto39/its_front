import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchTechRequests } from "../store/slices/techRequestSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";
import { useFilterTechRequest } from "./useFilterTechRequest";

export function useTechRequests() {
    const messageSet: IMessage = {} as IMessage;
  
    const { techRequests, isLoading, isGetTechRequests, error } = useAppSelector((state) => state.techRequest);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!isGetTechRequests) {
        dispatch(fetchTechRequests());
      }
    }, [dispatch, techRequests, isGetTechRequests]);
  
    if (error) {
      messageSet.type = "E";
      messageSet.title = "Error";
      messageSet.message = error;
      dispatch(setMessage(messageSet));
    }
    
  const filteredSortedTechRequests = useFilterTechRequest(techRequests);

  return { techRequests, filteredSortedTechRequests, isLoading, error };
}