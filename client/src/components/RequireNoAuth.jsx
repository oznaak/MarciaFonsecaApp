import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireNoAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/userDashboard" replace />;
  }
  return children;
};

export default RequireNoAuth; 