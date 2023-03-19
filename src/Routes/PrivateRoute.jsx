import React from "react";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) <div>Loading...</div>;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
