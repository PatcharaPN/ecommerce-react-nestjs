import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./features/productSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
