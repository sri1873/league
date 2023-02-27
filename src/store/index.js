import {configureStore, createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: { isValid: false },
    reducers: {
        toggleActive: (state) => {
            state.isValid = !state.isValid;
        },
    }
})

const store = configureStore({
    reducer: { auth: authSlice.reducer }
});

console.log(store.getState());

export { store };
export const { toggleActive } = authSlice.actions;