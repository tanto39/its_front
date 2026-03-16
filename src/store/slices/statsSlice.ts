import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiStats } from "../../api/apiStats.ts";
import { IStats, StatsState } from "../../types/index";

const initialState: StatsState = {
  stats: null,
  isLoading: false,
  error: null,
};

export const fetchStats = createAsyncThunk("stats/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await apiStats.getStats();
    if (response.avgIts !== undefined) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

const StatsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение статистики
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearStats, clearError } = StatsSlice.actions;

// Экспортируем reducer
export default StatsSlice.reducer;
