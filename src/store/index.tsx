import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authSlice from "./AuthSlice";
import arenaSlice from "./ArenaSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authSlice.reducer),
  arena: persistReducer(persistConfig,arenaSlice.reducer)
})

// const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export { store };
export const persistor = persistStore(store);
export const { toggleActive, addUser, setErrorMsg, clearErrorMsg } =
  authSlice.actions;
export const { setArenaDetails, clearArenaDetails } = arenaSlice.actions;
export type State = ReturnType<typeof rootReducer>;