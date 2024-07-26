import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "../../types/types";
import { json } from "react-router-dom";

export interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  currentUser: any;
}
const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Failed to parse user data from localStorage:", e);
    localStorage.removeItem("user");
    return null;
  }
};
const initialUser = getInitialUser();

const initialState: AuthState = {
  user: initialUser,
  loading: false,
  error: null,
  accessToken: null,
  currentUser: initialUser,
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
  const { user, access_token } = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", access_token);
  console.log(response.data);

  return response.data;
});

export const register = createAsyncThunk<
  any,
  { email: string; username: string; password: string; role: string },
  { state: RootState }
>(
  "/auth/register",
  async ({ username, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          email,
          username,
          password,
          confirmPassword: password,
          role,
        }
      );
      const { user, access_token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(response.data);

      localStorage.setItem("accessToken", access_token);

      return response.data;
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const UpdateUser = createAsyncThunk<
  User,
  FormData,
  { state: RootState }
>("/user/update", async (formData: FormData, { getState }) => {
  const state = getState();
  const userId = state.auth.currentUser._id;

  const response = await axios.put(
    `http://localhost:3000/users/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  const updatedUser = response.data.user;
  console.log("Updated user:", updatedUser);

  return updatedUser;
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
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
        state.currentUser = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export const { logout, setCurrentUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export default authSlice.reducer;
