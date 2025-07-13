import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const {data} = await axiosSecure(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`);
            setRole(data?.role);
        }
        fetchUserRole();
    }, [user, axiosSecure])
    console.log(role);
    return [role];
};

export default useRole;