export const selectBooks = (state) => state.books.items;
export const selectRecommendedBooks = (state) => state.books.recommended;
export const selectIsLoadingBooks = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectCurrentPage = (state) => state.books.currentPage;
export const selectTotalPages = (state) => state.books.totalPages;
export const selectFilters = (state) => state.books.filters;
export const selectFilteredBooks = (state) => {
  const { books, filters } = state.books;
  return books.filter((book) => {
    if (filters.status === "reading") {
      return book.progress.some((entry) => entry.status === "active");
    }
    if (filters.status === "finished") {
      return book.progress.some((entry) => entry.finishPage !== undefined);
    }
    return true;
  });
};
