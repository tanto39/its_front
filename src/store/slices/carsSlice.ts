import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiCars } from "../../api/apiCars";
import { ICar, CarsState } from "../../types/index";

const initialState: CarsState = {
  cars: [],
  optionsCars: [],
  car: {} as ICar,
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

export const createCar = createAsyncThunk("cars/create", async (data: Omit<ICar, "car_id">, { rejectWithValue }) => {
  try {
    const response = await ApiCars.createCar(data);
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
  async ({ id, data }: { id: number; data: Partial<ICar> }, { rejectWithValue }) => {
    try {
      const response = await ApiCars.updateCar(id, data);
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
      state.car = {} as ICar;
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
        state.cars.push(action.payload);
        state.optionsCars.push({
          value: state.car.car_id,
          label: state.car.name,
        });

        state.successSend = true;
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
        // Обновляем в списке
        if (state.cars.length > 0) {
          const index = state.cars.findIndex((p) => p.car_id === action.payload.car_id);
          state.cars[index] = action.payload;
          const indexOp = state.optionsCars.findIndex((p) => p.value === action.payload.car_id);
          state.optionsCars[indexOp].label = action.payload.name;
        }
        state.successSend = true;
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
        // Обновляем в списке
        if (state.cars.length > 0) {
          const index = state.cars.findIndex((p) => p.car_id === action.payload.car_id);
          state.cars.splice(index, 1);
          const indexOp = state.optionsCars.findIndex((p) => p.value === action.payload.car_id);
          state.optionsCars.splice(indexOp, 1);
        }

        state.successSend = true;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentCar, setCurrentCar, clearError, clearSend } = CarsSlice.actions;

// Экспортируем reducer
export default CarsSlice.reducer;
