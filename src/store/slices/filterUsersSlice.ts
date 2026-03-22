import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterUsersState } from '../../types';

const initialState: FilterUsersState = {
  person: '',
  sort: 'name_asc',
};

const filterUsersSlice = createSlice({
  name: 'filterUsers',
  initialState,
  reducers: {
    setPersonFilter: (state, action: PayloadAction<string>) => {
      state.person = action.payload;
    },
    setSortUsers: (state, action: PayloadAction<'name_asc' | 'name_desc' | 'login_asc' | 'login_desc'>) => {
      state.sort = action.payload;
    },
    resetUsersFilters: () => initialState,
  },
});

export const {
  setPersonFilter,
  setSortUsers,
  resetUsersFilters,
} = filterUsersSlice.actions;

export default filterUsersSlice.reducer;