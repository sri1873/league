import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../types";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isValid: false,
        user: {
            userName: null,
            token: null,
            userId: null,
            roles: [],
        },
        errorMsg: "",
    } as AuthState,
    reducers: {
        toggleActive: (state: AuthState) => {
            state.isValid = !state.isValid;
        },
        addUser: (state: AuthState, action: PayloadAction<User>) => {
            console.log(action.payload);
            state.user.userId = action.payload.userId;
            state.user.token = action.payload.token;
            state.user.roles = action.payload.roles;
            state.user.userName = action.payload.userName;
        },
        setErrorMsg: (state: AuthState, action: PayloadAction<string>) => {
            state.errorMsg = action.payload;
        },
        clearErrorMsg: (state: AuthState) => {
            state.errorMsg = "";
        },
    },
});

export default authSlice