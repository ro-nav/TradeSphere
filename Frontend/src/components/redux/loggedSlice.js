import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  loggedIn: false, // Tracks if the user is logged in
  userData: null, // Stores user information
  showNavbar: true, // Controls the visibility of the navbar
};

// Create a slice for authentication and user state management
const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    /**
     * Handles user login
     * @param {Object} state - Current state
     * @param {Object} action - Action containing user data payload
     */
    login: (state, action) => {
      state.loggedIn = true; // Set logged-in status
      state.user = action.payload; // Store user data
      state.showNavbar = false; // Hide navbar post-login
    },

    /**
     * Handles user logout
     * @param {Object} state - Current state
     */
    logout: (state) => {
      state.loggedIn = false; // Set logged-out status
      state.user = null; // Clear user data
      state.showNavbar = true; // Show navbar post-logout
    },

    /**
     * Updates user profile
     * @param {Object} state - Current state
     * @param {Object} action - Action containing updated profile data
     */
    updateProfile: (state, action) => {
      state.user = { ...state.userData, ...action.payload }; // Merge updated data
    },
  },
});

// Export actions for use in components
export const { login, logout, updateProfile } = loggedSlice.actions;

// Export the reducer for store configuration
export default loggedSlice.reducer;
