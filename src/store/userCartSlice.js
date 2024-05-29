import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  cart: [],
};

export const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.product];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart?.filter(
        (item) => item?.id !== action.payload.product?.id
      );
    },
    updateQuantity: (state, action) => {
      state.cart = state.cart?.map((item) => {
        if (item?.id === action.payload.product.id) {
          return { ...item, quantity: action.payload.product.quantity };
        }
        return item;
      });
    },
    createOrder: (state, action) => {
      state.orders = [...state.orders, action.payload.order];
      state.cart = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateQuantity, createOrder } =
  userCartSlice.actions;
export const userCartSelector = (state) => state.userCart;
export default userCartSlice.reducer;
