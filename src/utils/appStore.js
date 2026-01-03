import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestsReducers from './requestsSlice'
import chatUsersReducer from './chatUsersSlice'

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestsReducers,
    ChatUsers: chatUsersReducer,
  },

});

export default appStore   