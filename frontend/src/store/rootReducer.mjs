import { combineReducers } from "@reduxjs/toolkit";
import cartSliceReducer from "../slices/cartSlice.mjs";
import authSliceReducer from "../slices/authSlice.mjs";
import { apiSlice } from "../slices/apiSlice.mjs";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
});

export default rootReducer;
