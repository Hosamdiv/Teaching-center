import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token?: string;
}


interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // ✅ حفظ بيانات المستخدم بعد تسجيل الدخول
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },

        logoutUser(state) {
            state.currentUser = null;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;

// ✅ Selector
export const selectCurrentUser = ({ users }: RootState) => users.currentUser;

export default userSlice.reducer;
