import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // User is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  // User is logged in, allow access
  return children;
};

export default ProtectedRoute;
