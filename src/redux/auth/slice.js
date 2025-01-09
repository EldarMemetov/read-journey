import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  signout,
  getCurrentUser,
  refreshToken,
} from "./operations";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Вход
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
