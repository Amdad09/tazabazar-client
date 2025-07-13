import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { user, loading } = useAuth();

    if (loading) {
        return <Loading/>
    }
    if (!user) {
       return <Navigate to="/logIn" state={{from: location}} replace='true'/>;
    }
    return children;
};

export default PrivateRoute;