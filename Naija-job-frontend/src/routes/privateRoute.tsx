import React from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;