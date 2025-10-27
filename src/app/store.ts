import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/product/ProductSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = typeof store;
