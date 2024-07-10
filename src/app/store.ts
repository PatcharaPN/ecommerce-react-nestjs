// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import authSlice from "./features/authSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
