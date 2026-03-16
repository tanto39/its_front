import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiTechRequest } from "../../api/apiTechRequest";
import { ITechRequest, TechRequestState } from "../../types/index";
import { techRequestForm } from "../../types/forms";

const initialState: TechRequestState = {
  techRequests: [],
  techRequest: null,
  isLoading: false,
  isGetTechRequests: false,
  error: null,
  successSend: false,
};

export const fetchTechRequests = createAsyncThunk("techRequests/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await apiTechRequest.getTechRequests();
    if (response.length > 0) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const fetchTechRequest = createAsyncThunk("techRequests/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await apiTechRequest.getTechRequest(id);
    if (response.request_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createTechRequest = createAsyncThunk(
  "techRequests/create",
  async (data: techRequestForm, { rejectWithValue }) => {
    try {
      const response = await apiTechRequest.createTechRequest(data);
      if (response.request_id) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка создания");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

export const updateTechRequest = createAsyncThunk(
  "techRequests/update",
  async ({ id, data }: { id: number; data: techRequestForm }, { rejectWithValue }) => {
    try {
      const response = await apiTechRequest.updateTechRequest(id, data);
      if (response.request_id) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

export const deleteTechRequest = createAsyncThunk(
  "techRequests/delete",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await apiTechRequest.deleteTechRequest(id);
      if (response.request_id) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка удаления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

const TechRequestSlice = createSlice({
  name: "TechRequests",
  initialState,
  reducers: {
    clearCurrentTechRequest: (state) => {
      state.techRequest = null;
    },
    clearTechRequests: (state) => {
      state.techRequests = null;
    },
    setCurrentTechRequest: (state, action: PayloadAction<ITechRequest>) => {
      state.techRequest = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSend(state) {
      state.successSend = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех заявок
      .addCase(fetchTechRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTechRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGetTechRequests = true;
        state.techRequests = action.payload;
      })
      .addCase(fetchTechRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isGetTechRequests = true;
        state.error = action.payload as string;
      })

      // Получение по ID
      .addCase(fetchTechRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTechRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.techRequest = action.payload;
      })
      .addCase(fetchTechRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание
      .addCase(createTechRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTechRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.techRequest = action.payload;
        state.successSend = true;
        state.techRequests = null;
        state.isGetTechRequests = false;
      })
      .addCase(createTechRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление
      .addCase(updateTechRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTechRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.techRequest = action.payload;
        state.successSend = true;
        state.techRequests = null;
        state.isGetTechRequests = false;
      })
      .addCase(updateTechRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Удаление
      .addCase(deleteTechRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTechRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.techRequests = null;
        state.isGetTechRequests = false;
      })
      .addCase(deleteTechRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentTechRequest, clearTechRequests, setCurrentTechRequest, clearError, clearSend } =
  TechRequestSlice.actions;

// Экспортируем reducer
export default TechRequestSlice.reducer;
