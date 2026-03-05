import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import messageSlice from './slices/message';
import carsSlice from './slices/carsSlice';
import usersSlice from './slices/usersSlice';
import unitSlice from './slices/unitSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    message: messageSlice,
    cars: carsSlice,
    users: usersSlice,
    unit: unitSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
});

export default store;