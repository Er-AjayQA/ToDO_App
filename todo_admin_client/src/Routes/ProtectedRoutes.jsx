// ProtectedRoute.js
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../ContextAPI/AuthContext";

const ProtectedRoute = () => {
  const { companyId: authCompanyId, isAuthenticated, logout } = useAuth();
  const { companyId: urlCompanyId } = useParams();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={`/task-management/${urlCompanyId}/login`} replace />;
  }

  if (authCompanyId !== urlCompanyId) {
    logout();
    return <Navigate to={`/task-management/${urlCompanyId}/login`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
