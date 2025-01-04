import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Sign up (register)
export const signup = createAsyncThunk(
  "users/signup",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("users/signup", newUser);
      setAuthHeader(response.data.token);
      toast.success("Registration successful!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Sign in (login)
export const signin = createAsyncThunk(
  "users/signin",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("users/signin", credentials);
      setAuthHeader(response.data.token);
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get current user info
export const getCurrentUser = createAsyncThunk(
  "users/current",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("users/current");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to get current user info.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get fresh token (refresh token)
export const refreshToken = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("users/current/refresh");
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to refresh token.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Sign out (logout)
export const signout = createAsyncThunk(
  "users/signout",
  async (_, thunkAPI) => {
    try {
      await axios.post("users/signout");
      clearAuthHeader();
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Logout failed. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
