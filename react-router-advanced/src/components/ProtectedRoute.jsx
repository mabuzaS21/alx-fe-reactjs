import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = false;

const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
