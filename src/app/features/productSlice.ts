import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { AsyncThunk } from "@reduxjs/toolkit";
import { CreateStore, FormValues } from "../../types/types";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  category: Category;
  quantity: number;
  store: Store;
  location: Store["location"];
}

export interface Store {
  _id: string;
  name: string;
  location: string;
  description: string;
  following: number;
  storeimg: string;
  like: number;
  products: Product[];
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}
export interface ProductState {
  products: Product[];
  stores: Store[];
  category: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  stores: [],
  category: [],
  loading: false,
  error: null,
};

export const getCategory = createAsyncThunk<Category[], void, any>(
  "product/getCategory",
  async (): Promise<Category[]> => {
    const { data } = await axios.get<Category[]>(
      "http://localhost:3000/category"
    );
    return data;
  }
);

export const getProducts: AsyncThunk<Product[], void, any> = createAsyncThunk(
  "product/getProducts",
  async (): Promise<Product[]> => {
    const { data: res } = await axios.get<Product[]>(
      "http://localhost:3000/products"
    );
    return res;
  }
);
export const submitProduct = createAsyncThunk<Product, any, any>(
  "products/submitProduct",
  async (formData: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return Error("Something went wrong");
    }
  }
);

export const deleteProduct = createAsyncThunk<Product, string, any>(
  "product/deleteProduct",
  async (id: string): Promise<Product> => {
    const { data: res } = await axios.delete<Product>(
      `http://localhost:3000/products/${id}`
    );
    return res;
  }
);
export const getStores: AsyncThunk<Store[], void, any> = createAsyncThunk(
  "product/getStores",
  async (): Promise<Store[]> => {
    const { data: res } = await axios.get<Store[]>(
      "http://localhost:3000/stores",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return res;
  }
);
export const createStore = createAsyncThunk<
  Store,
  FormData,
  { rejectValue: string }
>("store/createStore", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<Store>(
      "http://localhost:3000/stores",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (data && data._id) {
      localStorage.setItem("storeId", data._id);
      console.log("Successfully set storeId in localStorage:", data._id);
      return data;
    } else {
      throw new Error("Invalid store data");
    }
  } catch (error) {
    console.error("Error creating store:");
    return rejectWithValue("Failed to create store");
  }
});

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
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = false;
        state.error = "error getting store";
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
      })
      .addCase(submitProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(submitProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error submitting product";
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores.push(action.payload);
      })
      .addCase(createStore.rejected, (state) => {
        state.loading = false;
        state.error = "Error creating store";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error deleting product";
      });
  },
});

export const { setProducts, setStores } = productSlice.actions;
export default productSlice.reducer;

export const selectProducts = (state: RootState) => state.product.products;
export const selectCategory = (state: RootState) => state.product.category;
export const selectStores = (state: RootState) => state.product.stores;
export const selectLoading = (state: RootState) => state.product.loading;
