import { ApiUsers } from './../../api/apiUsers';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UsersState } from "../../types/index";

const initialState: UsersState = {
  users: [],
  optionsUsers: [],
  user: {} as IUser,
  isLoading: false,
  error: null,
  successSend: false,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await ApiUsers.getUsers();
    if (response.length > 0) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const fetchUser = createAsyncThunk("users/fetchByLogin", async (login: string, { rejectWithValue }) => {
  try {
    const response = await ApiUsers.getUser(login);
    if (response.login) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createUser = createAsyncThunk("users/create", async (data: Omit<IUser, "login">, { rejectWithValue }) => {
  try {
    const response = await ApiUsers.createUser(data);
    if (response.login) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка создания");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ login, data }: { login: string; data: Partial<IUser> }, { rejectWithValue }) => {
    try {
      const response = await ApiUsers.updateUser(login, data);
      if (response.login) {
        return response;
      } else {
        return rejectWithValue(response || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  },
);

export const deleteUser = createAsyncThunk("Users/delete", async ({ login }: { login: string }, { rejectWithValue }) => {
  try {
    const response = await ApiUsers.deleteUser(login);
    if (response.login) {
      return response;
    } else {
      return rejectWithValue(response || "Ошибка удаления");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.user = {} as IUser;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
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
      // Получение всех users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.optionsUsers = state.users.map((user) => ({
          value: user.login,
          label: `${user.second_name} ${user.first_name} ${user.middle_name}`,
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Получение по ID
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
        state.user = action.payload;
        state.successSend = true;
        state.optionsUsers.push({
          value: state.user.login,
          label: `${state.user.second_name} ${state.user.first_name} ${state.user.middle_name}`,
        });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        // Обновляем в списке
        const index = state.users.findIndex((p) => p.login === action.payload.login);
        state.users[index] = action.payload;

        const indexOp = state.optionsUsers.findIndex((p) => p.value === action.payload.login);
        state.optionsUsers[indexOp].label = `${state.user.second_name} ${state.user.first_name} ${state.user.middle_name}`;
        
        state.successSend = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Удаление
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Обновляем в списке
        const index = state.users.findIndex((p) => p.login === action.payload.login);
        state.users.splice(index, 1)

        const indexOp = state.optionsUsers.findIndex((p) => p.value === action.payload.login);
        state.optionsUsers.splice(indexOp, 1)

        state.successSend = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentUser, setCurrentUser, clearError, clearSend } = UsersSlice.actions;

// Экспортируем reducer
export default UsersSlice.reducer;
