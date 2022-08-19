import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import permissionReducer from "../features/permissionSlice";
import groupReducer from "../features/groupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    permission: permissionReducer,
    group: groupReducer,
  },
  /*    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }), */
});

export default store;
