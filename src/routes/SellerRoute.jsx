import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';
import Loading from '../shared/Loading';

const SellerRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <Loading />;
    }
    if (role === 'seller') return children;
    return <Navigate to="/" />;
};

export default SellerRoute;
