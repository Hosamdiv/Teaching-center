import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./features/product/usersSlice";
import { useDispatch } from "react-redux";
import type { User } from "./features/product/usersSlice";

// نحاول نرجع بيانات المستخدم من localStorage علشان تفضل القيم زي isAdmin بعد الريفريش
const rawUser = localStorage.getItem("user");
let preloadedUser: User | null = null;

if (rawUser) {
  try {
    const parsed = JSON.parse(rawUser);
    preloadedUser = {
      id: parsed._id ?? parsed.id ?? parsed.id?.toString?.() ?? "",
      name: parsed.name ?? "",
      email: parsed.email ?? "",
      isAdmin: !!parsed.isAdmin,
      token: localStorage.getItem("token") ?? undefined,
    };
  } catch {
    // لو حصل خطأ في الـ JSON نسيبه فاضي
    preloadedUser = null;
  }
}

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  preloadedState: {
    users: {
      currentUser: preloadedUser,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = typeof store;
