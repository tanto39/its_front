import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiCars } from "../../api/apiCars";
import { ICar, CarsState } from "../../types/index";

const initialState: CarsState = {
  cars: [],
  optionsCars: [],
  car: null,
  isLoading: false,
  isGetCars: false,
  error: null,
  successSend: false,
};

export const fetchCars = createAsyncThunk("cars/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await ApiCars.getCars();
    if (response.length > 0) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const fetchCar = createAsyncThunk("cars/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await ApiCars.getCar(id);
    if (response.car_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createCar = createAsyncThunk("cars/create", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await ApiCars.createCar(formData);
    if (response.car_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка создания");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updateCar = createAsyncThunk(
  "cars/update",
  async ({ id, formData }: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await ApiCars.updateCar(id, formData);
      if (response.car_id) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

export const deleteCar = createAsyncThunk("cars/delete", async ({ id }: { id: number }, { rejectWithValue }) => {
  try {
    const response = await ApiCars.deleteCar(id);
    if (response.car_id) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка удаления");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

const CarsSlice = createSlice({
  name: "Cars",
  initialState,
  reducers: {
    clearCurrentCar: (state) => {
      state.car = null;
    },
    clearCars: (state) => {
      state.cars = null;
    },
    setCurrentCar: (state, action: PayloadAction<ICar>) => {
      state.car = action.payload;
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
      // Получение всех автомобилей
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGetCars = true;
        state.cars = action.payload;
        state.optionsCars = state.cars.map((car) => ({
          value: car.car_id,
          label: car.name,
        }));
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isGetCars = true;
        state.error = action.payload as string;
      })

      // Получение по ID
      .addCase(fetchCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
        state.successSend = true;
        state.cars = null;
        state.isGetCars = false;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
        state.successSend = true;
        state.cars = null;
        state.isGetCars = false;
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Удаление
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = null;
        state.isGetCars = false;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentCar, clearCars, setCurrentCar, clearError, clearSend } = CarsSlice.actions;

// Экспортируем reducer
export default CarsSlice.reducer;
