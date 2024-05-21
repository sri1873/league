import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface arenaState{
    arenaId: null | string,
    arenaName:null|string
}

const arenaSlice = createSlice({
    name: "arenaSlice",
    initialState: {
        arenaId: null,
        arenaName:null
    } as arenaState,
    reducers: {
        setArenaDetails: (state: arenaState, action: PayloadAction<arenaState>) => {
            state.arenaId = action.payload.arenaId;
            state.arenaName = action.payload.arenaName;
        },
        clearArenaDetails: (state: arenaState) => {
            state.arenaId = null;
            state.arenaName = null;
        },
    },
});

export default arenaSlice