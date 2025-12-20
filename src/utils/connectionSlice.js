import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        setConnection: (state, action) => action.payload,
        clearConnections: () => [],
    },
});
export const { setConnection, removeConnection , clearConnections} =
    connectionSlice.actions;

export default connectionSlice.reducer;
