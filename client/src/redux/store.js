import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";

//The combineReducers() helper function turns an object whose values are different reducing functions into a single reducing function that we can pass to createStore().
const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

//persistReducer returns an enhanced reducer that wraps the rootReducer you pass in and will persist that reducer's state according to the config you pass in. The reducers themselves are not persisted since they are just functions.
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  //default middleware for checking non-serilizable value, if detected will throw an error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)
