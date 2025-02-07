import { createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const loadStateFromStorage = () => {
  const savedState = localStorage.getItem("userState");
  return savedState ? JSON.parse(savedState) : { loggedIn: false, userData: null, showNavbar: true };
};

// Create a slice for authentication and user state management
const loggedSlice = createSlice({
  name: "logged",
  initialState: loadStateFromStorage(), // Initialize with loaded state
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
      state.showNavbar = false;
      localStorage.setItem("userState", JSON.stringify(state)); // Save to localStorage
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userData = null;
      state.showNavbar = true;
      localStorage.removeItem("userState"); // Clear from localStorage
    },
    updateProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem("userState", JSON.stringify(state)); // Save updated state
    },
  },
});

// Export actions and reducer
export const { login, logout, updateProfile } = loggedSlice.actions;
export default loggedSlice.reducer;
