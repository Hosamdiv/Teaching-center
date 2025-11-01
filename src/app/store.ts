import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/product/usersSlice";
import { useDispatch } from "react-redux";
import type { User } from "./features/product/usersSlice";

// Try to rehydrate user from localStorage so fields like isAdmin persist after refresh
const rawUser = localStorage.getItem("user");
let preloadedUser: User | null = null;

if (rawUser) {
  try {
    const parsed = JSON.parse(rawUser);
    preloadedUser = {
      id: parsed.id?.toString?.() ?? "",
      name: parsed.name ?? "",
      email: parsed.email ?? "",
      isAdmin: !!parsed.isAdmin,
      token: localStorage.getItem("token") ?? undefined,
    };
  } catch {
    // ignore parse errors and leave preloadedUser null
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
