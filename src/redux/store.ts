import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice';
import userLoginSlice from './userLogin/userLoginSlice';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    userLogin: userLoginSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch