import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cartReducer",
  initialState: [],
  reducers: {
    addToCart: (state, payload) => {
      let found = false;
      let index = 0;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === payload.payload.id) {
          found = true;
          index = i;
          break;
        }
      }
      if (found) {
        if (state[index].quantity <= 4) {
          state[index].quantity += 1;
        }
      } else {
        state.push(payload.payload);
      }
    },
    removeFromCart: (state, payload) => {
      let found = false;
      let index = 0;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === payload.payload.id) {
          found = true;
          index = i;
          break;
        }
      }
      if (found) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartReducer.actions;

export default cartReducer.reducer;
