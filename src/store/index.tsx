import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { AuthState, AuthActions, User } from "../types";

const persistConfig = {
  key: "root",
  storage,
};

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
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export { store };
export const persistor = persistStore(store);
export const { toggleActive, addUser, setErrorMsg, clearErrorMsg } =
  authSlice.actions;
