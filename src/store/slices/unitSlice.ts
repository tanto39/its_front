import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiUnit } from "../../api/apiUnit";
import { IUnit, UnitState } from "../../types/index";

const initialState: UnitState = {
  unit: null,
  isLoading: false,
  error: null,
  successSend: false,
};

export const fetchUnit = createAsyncThunk("unit/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await ApiUnit.getUnit(id);
    if (response.unit_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createUnit = createAsyncThunk("unit/create", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await ApiUnit.createUnit(formData);
    if (response.unit_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка создания");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updateUnit = createAsyncThunk(
  "unit/update",
  async ({ id, formData }: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await ApiUnit.updateUnit(id, formData);
      if (response.unit_id) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

export const deleteUnit = createAsyncThunk("unit/delete", async ({ id }: { id: number }, { rejectWithValue }) => {
  try {
    const response = await ApiUnit.deleteUnit(id);
    if (response.unit_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка удаления");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

const UnitSlice = createSlice({
  name: "Unit",
  initialState,
  reducers: {
    clearCurrentUnit: (state) => {
      state.unit = null;
    },
    setCurrentUnit: (state, action: PayloadAction<IUnit>) => {
      state.unit = action.payload;
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
      // Получение по ID
      .addCase(fetchUnit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unit = action.payload;
      })
      .addCase(fetchUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание
      .addCase(createUnit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unit = action.payload;
        state.successSend = true;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление
      .addCase(updateUnit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unit = action.payload;
        state.successSend = true;
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Удаление
      .addCase(deleteUnit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unit = null;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentUnit, setCurrentUnit, clearError, clearSend } = UnitSlice.actions;

// Экспортируем reducer
export default UnitSlice.reducer;
