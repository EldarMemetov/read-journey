import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const API_URL = "https://readjourney.b.goit.study/api";
import { refreshToken } from "../auth/operations";

// Get recommended books
export const getRecommendedBooks = createAsyncThunk(
  "books/getRecommended",
  async ({ page, limit }, { getState, dispatch }) => {
    const { auth } = getState();
    try {
      const response = await axios.get(`${API_URL}/books/recommend`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: { page, limit },
      });
      return response.data; // Сервер повертає totalPages, page, та результати
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await dispatch(refreshToken());
          const updatedAuth = getState().auth;
          const retryResponse = await axios.get(`${API_URL}/books/recommend`, {
            headers: {
              Authorization: `Bearer ${updatedAuth.token}`,
            },
            params: { page, limit },
          });
          return retryResponse.data;
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          throw refreshError;
        }
      }
      throw error;
    }
  }
);

// Add a new book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.post(`${API_URL}/books/add`, bookData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Book added successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add the book.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Add book from recommendations
export const addBookFromRecommendations = createAsyncThunk(
  "books/addFromRecommendations",
  async (bookId, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/books/add/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Book added from recommendations!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add the book from recommendations.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Delete a user's book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      await axios.delete(`${API_URL}/books/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Book deleted successfully!");
      return bookId;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete the book.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get user's books
export const getUserBooks = createAsyncThunk(
  "books/getUserBooks",
  async (_, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.get(`${API_URL}/books/own`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user's books.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Save the start of reading the book
export const startReadingBook = createAsyncThunk(
  "books/startReading",
  async (bookData, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/books/reading/start`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Started reading the book!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to start reading the book.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Save the finish of reading the book
export const finishReadingBook = createAsyncThunk(
  "books/finishReading",
  async (bookData, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/books/reading/finish`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Finished reading the book!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to finish reading the book.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Delete the reading of the book
export const deleteReading = createAsyncThunk(
  "books/deleteReading",
  async (_, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      await axios.delete(`${API_URL}/books/reading`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Reading deleted successfully!");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete the reading.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Get book info by ID
export const getBookById = createAsyncThunk(
  "books/getById",
  async (bookId, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const response = await axios.get(`${API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch book info.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
