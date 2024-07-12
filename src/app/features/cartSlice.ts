import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface CartState {
  items: Product[];
  totalItemCount: number;
}
const initialState: CartState = {
  items: [],
  totalItemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectTotalItemCount = (state: { cart: CartState }) => {
  let totalCount = 0;
  state.cart.items.forEach((product) => {
    totalCount += product.quantity;
  });
  return totalCount;
};
export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
