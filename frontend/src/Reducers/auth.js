import { createSlice } from "@reduxjs/toolkit";

const authData = {
  userId: "",
  isLoggedIn: false,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState: authData,
  reducers: {
    login: (state, payload) => {
      state.userId = payload.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
