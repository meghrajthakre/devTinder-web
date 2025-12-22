import { createSlice } from "@reduxjs/toolkit";

const chatUsersSlice = createSlice({
    name: "ChatUsers",
    initialState: [],
    reducers: {
        setChats: (state, action) => {
            return action.payload; 
        },
        clearChats: () => [],
    },
});
export const { setChats, clearChats } =
    chatUsersSlice.actions;

export default chatUsersSlice.reducer;
