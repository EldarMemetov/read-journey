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
    console.log("Sending data to server:", newUser);
    try {
      const response = await axios.post("users/signup", newUser);
      console.log("Response from server:", response.data);
      setAuthHeader(response.data.token);
      toast.success("Registration successful!");
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error.response);
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
    console.log("Attempting login with credentials:", credentials);

    try {
      const response = await axios.post("users/signin", credentials);
      console.log("Login successful, server response:", response.data);

      setAuthHeader(response.data.token);
      toast.success("Login successful!");

      return response.data;
    } catch (error) {
      console.error("Login failed, error response:", error.response);

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
    const token = thunkAPI.getState().auth.token; // Get token from state
    if (!token) {
      toast.error("Token is missing.");
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    try {
      setAuthHeader(token); // Ensure the token is set in the header
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
  "auth/refreshToken",
  async (_, thunkAPI) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return thunkAPI.rejectWithValue("No refresh token available");
    }

    try {
      const response = await axios.post("users/current/refresh", {
        token: refreshToken,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setAuthHeader(response.data.accessToken);

      return {
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error) {
      toast.error(error, "Failed to refresh token. Please log in again.");
      thunkAPI.dispatch(signout());
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

// Sign out (logout)
export const signout = createAsyncThunk(
  "users/signout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        throw new Error("No token found for logout.");
      }

      setAuthHeader(token);
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
