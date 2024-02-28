import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.mjs";

// Reducers
import cartSliceReducer from "./slices/cartSlice.mjs";
import authSliceReducer from "./slices/authSlice.mjs";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE !== "production",
});

export default store;
