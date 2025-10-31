import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/product/usersSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = typeof store;
