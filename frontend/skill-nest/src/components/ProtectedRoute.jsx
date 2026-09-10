import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "mentor") {
      return <Navigate to="/mentor" replace />;
    }

    return <Navigate to="/learner/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;