import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import booksReducer from "./book/slice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken", "user"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistBooksConfig = {
  key: "books",
  storage,
  whitelist: ["items", "recommended"],
};

const persistedBooksReducer = persistReducer(persistBooksConfig, booksReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    books: persistedBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
