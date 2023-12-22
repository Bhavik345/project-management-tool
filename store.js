import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootreducer";
import persistStore from "redux-persist/es/persistStore";

const rootPersistConfig = {
  key: "root",
  storage,
};

const persist = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    root: persist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
