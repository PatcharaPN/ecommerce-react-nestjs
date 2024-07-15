// src/store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import authSlice from "./features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./features/cartSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
