import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

const RegistrationPage = lazy(() =>
  import("../../Page/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../Page/LoginPage/LoginPage"));
const RecommendedPage = lazy(() =>
  import("../../Page/RecommendedPage/RecommendedPage")
);
const NotFoundPage = lazy(() => import("../../Page/NotFoundPage/NotFoundPage"));

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
