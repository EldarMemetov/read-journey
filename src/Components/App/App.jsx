import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { refreshToken, getCurrentUser } from "../../redux/auth/operations";
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthToken,
} from "../../redux/auth/selectors";
import Loading from "../Loading/Loading";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const RegistrationPage = lazy(() =>
  import("../../Page/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../Page/LoginPage/LoginPage"));
const RecommendedPage = lazy(() =>
  import("../../Page/RecommendedPage/RecommendedPage")
);
const NotFoundPage = lazy(() => import("../../Page/NotFoundPage/NotFoundPage"));
const MyLibrary = lazy(() => import("../../Page/MyLibrary/MyLibrary"));
const MyReading = lazy(() => import("../../Page/MyReading/MyReading"));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(refreshToken()); // Восстанавливаем токен
      if (token) {
        dispatch(getCurrentUser()); // Загружаем текущего пользователя
      }
    };

    initializeApp();
  }, [dispatch, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loading />}>
        {isAuthenticated && <Layout />}
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
            </>
          )}

          {isAuthenticated && (
            <>
              <Route
                path="/recommended"
                element={
                  <ProtectedRoute>
                    <RecommendedPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={<Navigate to="/recommended" replace />}
              />
              <Route path="/library" element={<MyLibrary />} />
              <Route path="/my-reading/:bookId" element={<MyReading />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
