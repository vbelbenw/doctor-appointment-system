import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-emerald-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    // 1. Check if authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. Security restriction: Force temporary password change
    if (user?.requires_password_change === true && location.pathname !== '/force-password-change') {
        return <Navigate to="/force-password-change" replace />;
    }

    // 3. Check if user role is allowed 
    if (allowedRoles && !allowedRoles.includes(user?.role) && location.pathname !== '/force-password-change') {
        // Kick them to login as instructed
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
