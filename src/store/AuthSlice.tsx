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
        errorColor: "danger"
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
        setErrorMsg: (state: AuthState, action: PayloadAction<{ errMsg: string, errColor: "success" | "danger" | "warning" }>) => {
            state.errorMsg = action.payload.errMsg;
            state.errorColor=action.payload.errColor
        },
        clearErrorMsg: (state: AuthState) => {
            state.errorMsg = "";
            state.errorColor = "danger";
        },
    },
});

export default authSlice