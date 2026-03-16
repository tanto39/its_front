import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterTechRequestState, IUser } from '../../types';

const initialState: FilterTechRequestState = {
  request_id: '',
  request_type: 'all',
  car_id: '',
  date_repair: '',
  person: '',
  sort: 'name_asc',
};

const FilterTechRequestSlice = createSlice({
  name: 'filterTechRequest',
  initialState,
  reducers: {
    setRequestIdFilter: (state, action: PayloadAction<string>) => {
      state.request_id = action.payload;
    },
    setRequestTypeFilter: (state, action: PayloadAction<'all' | 'to' | 'repair'>) => {
      state.request_type = action.payload;
    },
    setCarIdTechFilter: (state, action: PayloadAction<string>) => {
      state.car_id = action.payload;
    },
    setDateRepairFilter: (state, action: PayloadAction<string>) => {
      state.date_repair = action.payload;
    },
    setPersonTechFilter: (state, action: PayloadAction<string>) => {
      state.person = action.payload;
    },
    setSortTech: (state, action: PayloadAction<'name_asc' | 'name_desc' | 'date_repair_asc' | 'date_repair_desc'>) => {
      state.sort = action.payload;
    },
    resetTechFilters: () => initialState,
  },
});

export const {
  setRequestIdFilter,
  setRequestTypeFilter,
  setCarIdTechFilter,
  setDateRepairFilter,
  setSortTech,
  setPersonTechFilter,
  resetTechFilters,
} = FilterTechRequestSlice.actions;

export default FilterTechRequestSlice.reducer;