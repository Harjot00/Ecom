import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

const cartReducer = createSlice({
  name: "cartReducer",
  initialState: cart || [],
  reducers: {
    addToCart: (state, payload) => {
      let found = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === payload.payload._id) {
          found = true;
          break;
        }
      }
      if (found === false) {
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
    emptyCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartReducer.actions;

export default cartReducer.reducer;
