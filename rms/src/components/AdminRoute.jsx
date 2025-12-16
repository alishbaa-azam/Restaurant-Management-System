import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!user) {
    // Not logged in -> send to admin login, preserve redirect
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user.role !== 'admin') {
    // Not an admin -> send to home
    return <Navigate to="/" replace />;
  }

  return children;
}
