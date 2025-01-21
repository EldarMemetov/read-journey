import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthToken } from "../../redux/auth/selectors";

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectAuthToken);

  // Дополнительная проверка для действительности токена
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
