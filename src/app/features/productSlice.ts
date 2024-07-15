import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { AsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  quantity: number;
  store: Store;
}

export interface Store {
  _id: string;
  name: string;
  location: string;
  following: number;
  like: number;
  products: Product[];
}

export interface ProductState {
  products: Product[];
  stores: Store[];
  loading: boolean; // Add loading state
}

const initialState: ProductState = {
  products: [],
  stores: [],
  loading: false, // Initialize loading state
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

export const getProductsByStoreId: AsyncThunk<Product[], string, any> =
  createAsyncThunk(
    "product/getProductsByStoreId",
    async (storeId: string): Promise<Product[]> => {
      const { data: res } = await axios.get<Product[]>(
        `http://localhost:3000/stores/${storeId}/products`
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
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        // Handle error if needed
      })
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state) => {
        state.loading = false;
        // Handle error if needed
      })
      .addCase(getProductsByStoreId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByStoreId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsByStoreId.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProducts, setStores } = productSlice.actions;
export default productSlice.reducer;

export const selectProducts = (state: RootState) => state.product.products;
export const selectStores = (state: RootState) => state.product.stores;
export const selectLoading = (state: RootState) => state.product.loading;
