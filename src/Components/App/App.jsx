import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const RegistrationPage = lazy(() =>
  import("../../Page/RegistrationPage/RegistrationPage")
);

const LoginPage = lazy(() => import("../../Page/LoginPage/LoginPage"));
const RecommendedPage = lazy(() =>
  import("../../Page/RecommendedPage/RecommendedPage")
);

const NotFoundPage = lazy(() => import("../../Page/NotFoundPage/NotFoundPage"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegistrationPage />} />

        <Route path="/recommended" element={<RecommendedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
