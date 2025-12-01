import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";   // **correct import**

const appStore = configureStore({
  reducer: {
    user: userReducer,   // **VALID reducer added**
  },
});

export default appStore;
