export const selectBooks = (state) => state.books.items;
export const selectRecommendedBooks = (state) => state.books.recommended;
export const selectIsLoadingBooks = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
