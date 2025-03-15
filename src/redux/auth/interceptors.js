import axios from "axios";
import { refreshToken, signout } from "./operations";
import { toast } from "react-hot-toast";
import { store } from "../store"; // Make sure to import the Redux store

// Add Axios interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response, // success response, no changes needed
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (HTTP 401)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the token
      try {
        const state = store.getState(); // Access Redux state
        const currentRefreshToken = state.auth.refreshToken; // Get the refresh token from Redux

        if (!currentRefreshToken) {
          toast.error("Refresh token is missing. Please log in again.");
          store.dispatch(signout()); // Sign out if no refresh token
          return Promise.reject(error);
        }

        // Dispatch refreshToken action to get a new access token
        const refreshAction = await store.dispatch(refreshToken());

        if (refreshAction.payload?.token) {
          // If refreshToken action is successful, set new access token in header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshAction.payload.token}`;

          // Retry the failed request with the new token
          return axios(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (err) {
        // If refreshing the token fails, sign out the user
        toast.error("Session expired. Please log in again.");
        store.dispatch(signout()); // Dispatch signout action to clear user state
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
