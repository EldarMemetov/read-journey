import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const API_URL = "https://readjourney.b.goit.study/api";
import { refreshToken } from "../auth/operations";

export const getRecommendedBooks = createAsyncThunk(
  "books/getRecommended",
  async ({ page, limit, filters }, { getState, dispatch }) => {
    const { auth } = getState();

    const safeFilters = {
      bookTitle: filters?.bookTitle || "",
      author: filters?.author || "",
    };

    try {
      const response = await axios.get(`${API_URL}/books/recommend`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          page,
          limit,
          title: safeFilters.bookTitle,
          author: safeFilters.author,
        },
      });
      return response.data;
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

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { getState, dispatch, thunkAPI }) => {
    const { auth } = getState();
    try {
      const payload = {
        title: bookData.title,
        author: bookData.author,
        totalPages: bookData.totalPages || 0,
      };
      const response = await axios.post(`${API_URL}/books/add`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Book added successfully!");
      dispatch(getUserBooks());
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add the book.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { getState, dispatch, thunkAPI }) => {
    const { auth } = getState();
    try {
      await axios.delete(`${API_URL}/books/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Book deleted successfully!");

      dispatch(getUserBooks());
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

export const deleteReading = createAsyncThunk(
  "books/deleteReading",
  async ({ bookId, readingIndex }, { getState, thunkAPI }) => {
    const { auth } = getState();
    try {
      const book = await axios.get(`${API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const readingId = book.data.progress[readingIndex]?._id;

      if (!readingId) {
        throw new Error("Reading ID not found");
      }

      console.log(
        "Deleting reading with Book ID:",
        bookId,
        "and Reading ID:",
        readingId
      );

      await axios.delete(
        `${API_URL}/books/reading?bookId=${bookId}&readingId=${readingId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

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
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
