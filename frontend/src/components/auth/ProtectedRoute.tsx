import { useAuthStore } from "../../stores/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, accessToken, loading } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
