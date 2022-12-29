import { createSlice } from "@reduxjs/toolkit";

const authData = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
};

const authReducer = createSlice({
  name: "authReducer",
  initialState: authData,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
