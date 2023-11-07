import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {user: userReducer},

  //default middleware for checking non-serilizable value, if detected will throw an error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
