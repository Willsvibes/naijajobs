
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Hooks/authContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;