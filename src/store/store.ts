import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
//import receptionSlice from './slices/receptionSlice';

const rootReducer = combineReducers({
    auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
});

export default store;