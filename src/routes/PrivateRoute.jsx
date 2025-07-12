import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const PrivateRoute = ({ children, loading }) => {
    const location = useLocation();

    const { user } = useAuth();

    if (loading) {
        return <Loading/>
    }
    if (!user) {
       <Navigate to="/logIn" state={{from: location}} replace='true'/>;
    }
    return children;
};

export default PrivateRoute;