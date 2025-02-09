import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loggedSlice";

/**
 * Configures and exports the Redux store
 */
const store = configureStore({
  reducer: {
    logged: loggedReducer, // Reducer to manage logged-in state
  },
});

export default store;
