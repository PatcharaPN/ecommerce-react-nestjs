import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
};

export const login = createAsyncThunk<
  any,
  { email: string; password: string },
  { state: RootState }
>("/auth/login", async ({ email, password }) => {
  const response = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });
  const { user, accessToken } = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);

  return response.data;
});

export const register = createAsyncThunk<
  any,
  { email: string; password: string },
  { state: RootState }
>("/auth/register", async ({ email, password }) => {
  const response = await axios.post("http://localhost:3000/auth/register", {
    email,
    password,
    confirmPassword: password,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.user = action.payload.user;
        state.error = null;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
