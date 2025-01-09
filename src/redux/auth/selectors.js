export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export const selectCurrentUser = (state) => state.auth.user;

export const selectAuthToken = (state) => state.auth.token;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectAuthError = (state) => state.auth.error;
