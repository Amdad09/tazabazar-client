
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});




const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {

        const reqInterceptor =  axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            console.log('Sending token:', token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        const resInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    await logOut();
                    localStorage.removeItem('access-token');
                    navigate('/login');
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosSecure.interceptors.response.eject(resInterceptor);
            axiosSecure.interceptors.request.eject(reqInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
