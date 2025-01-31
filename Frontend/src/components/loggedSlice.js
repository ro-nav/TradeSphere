import { createSlice } from '@reduxjs/toolkit';

const loggedSlice = createSlice({
  name: 'logged',
  initialState: {
    loggedIn: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
    updateProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const { login, logout, updateProfile } = loggedSlice.actions;
export default loggedSlice.reducer;
