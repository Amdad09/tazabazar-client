import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';
import Loading from '../shared/Loading';

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <Loading />;
    }
    if (role === 'admin') return children;
    return <Navigate to="/" />;
};

export default AdminRoute;
