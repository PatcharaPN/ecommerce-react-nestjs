import { createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  quantity: number;
}
export interface Store {
  _id: string;
  name: string;
  location: number;
  following: string;
  like: string;
  products: Product[];
}

export interface ProductState {
  products: Product[];
  stores: Store[];
}

const initialState: ProductState = {
  products: [],
  stores: [],
};

export const getProducts: AsyncThunk<Product[], void, any> = createAsyncThunk(
  "product/getProducts",
  async (): Promise<Product[]> => {
    const { data: res } = await axios.get<Product[]>(
      "http://localhost:3000/products"
    );
    return res;
  }
);
export const getStores: AsyncThunk<Store[], void, any> = createAsyncThunk(
  "product/getStores",
  async (): Promise<Store[]> => {
    const { data: res } = await axios.get<Store[]>(
      "http://localhost:3000/stores"
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
    setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
  },
});

export default productSlice.reducer;
