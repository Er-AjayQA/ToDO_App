// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { token } = useContext();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
