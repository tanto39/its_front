import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types';

const initialState: FilterState = {
  name: '',
  reg_number: '',
  car_id: '',
  person: '',
  its: 'all',
  sort: 'name_asc',
};

const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRegNumberFilter: (state, action: PayloadAction<string>) => {
      state.reg_number = action.payload;
    },
    setCarIdFilter: (state, action: PayloadAction<string>) => {
      state.car_id = action.payload;
    },
    setPersonFilter: (state, action: PayloadAction<string>) => {
      state.person = action.payload;
    },
    setItsFilter: (state, action: PayloadAction<'all' | '70-100' | '30-69' | '0-29'>) => {
      state.its = action.payload;
    },
    setSort: (state, action: PayloadAction<'name_asc' | 'name_desc' | 'its_asc' | 'its_desc'>) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setNameFilter,
  setRegNumberFilter,
  setCarIdFilter,
  setPersonFilter,
  setItsFilter,
  setSort,
  resetFilters,
} = FilterSlice.actions;

export default FilterSlice.reducer;