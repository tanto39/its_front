import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth.ts';
import { AuthState, IUser } from '../../types/index.ts';
import { LoginFormData } from '../../types/forms.ts';

// Получаем начальное состояние из localStorage
const getInitialState = (): AuthState => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  return {
    user: userStr ? JSON.parse(userStr) : null,
    token: token,
    isLoading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const sendAuth = createAsyncThunk(
  'auth/sendAuth',
  async (formData: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(formData);
      if (response.user.login) {
        const user: IUser = { ...response.user };
        // Сохраняем пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Сохраняем токен, если он есть
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return { 
          user, 
          token: response.token || null 
        };
      } else {
        return rejectWithValue('Ошибка авторизации');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  authApi.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(sendAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(sendAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;