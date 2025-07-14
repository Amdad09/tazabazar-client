import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user.email}`);
            return res.data?.role;
        },
    });

    return [role, isLoading];
};

export default useRole;
