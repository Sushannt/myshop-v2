import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.mjs";

// Reducer
import rootReducer from "./rootReducer.mjs";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE !== "production",
});

export default store;
