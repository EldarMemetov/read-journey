import { createSlice } from "@reduxjs/toolkit";
import {
  getRecommendedBooks,
  addBook,
  addBookFromRecommendations,
  deleteBook,
  getUserBooks,
  startReadingBook,
  finishReadingBook,
  deleteReading,
  getBookById,
} from "./operations";

const initialState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  recommended: [],
  isLoading: false,
  error: null,
  filters: {
    bookTitle: "",
    author: "",
  },
  bookDetails: null,
};

const booksReducer = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recommended books
      .addCase(getRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommended = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(getRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add new book
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        // state.items.push(action.payload);
        state.isLoading = false;
        const isBookExist = state.items.some(
          (book) => book.id === action.payload.id
        );
        if (!isBookExist) {
          state.items.push(action.payload);
        }
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add book from recommendations
      .addCase(addBookFromRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBookFromRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addBookFromRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete book
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch user's books
      .addCase(getUserBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getUserBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Start reading a book
      .addCase(startReadingBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startReadingBook.fulfilled, (state) => {
        state.isLoading = false;
        // Optional: update the reading state of the book if necessary
      })
      .addCase(startReadingBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Finish reading a book
      .addCase(finishReadingBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(finishReadingBook.fulfilled, (state) => {
        state.isLoading = false;
        // Optional: update the reading state of the book if necessary
      })
      .addCase(finishReadingBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete reading
      .addCase(deleteReading.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReading.fulfilled, (state) => {
        state.isLoading = false;
        // Optional: reset or update the state based on the deletion
      })
      .addCase(deleteReading.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getBookById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookDetails = action.payload;
        // Optional: handle the retrieved book information if necessary
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setFilters } = booksReducer.actions;
export default booksReducer.reducer;
