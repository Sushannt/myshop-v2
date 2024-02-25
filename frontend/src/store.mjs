import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.mjs";

import cartSliceReducer from "./slices/cartSlice.mjs";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE !== "production",
});

export default store;
