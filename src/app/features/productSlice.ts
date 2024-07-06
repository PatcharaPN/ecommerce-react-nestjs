import { createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  productImage: string;
  rating: number;
}

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const getProducts: AsyncThunk<Product[], void, any> = createAsyncThunk(
  "product/getProducts",
  async (): Promise<Product[]> => {
    const { data: res } = await axios.get<Product[]>(
      "http://localhost:3000/product"
    );
    return res;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
