import { createBrowserRouter } from 'react-router';
import UpdateProductForm from '../Component/Form/UpdateProductForm';
import AuthLayout from '../layouts/AuthLayout';
import MainLayouts from '../layouts/MainLayouts';
import AllProducts from '../Pages/AllProducts/AllProducts';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register';
import AdminAllProduct from '../Pages/Dashboard/Admin/AdminAllProduct';
import AllAdvertisements from '../Pages/Dashboard/Admin/AllAdvertisements';
import AllOrders from '../Pages/Dashboard/Admin/AllOrders';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers';
import Profile from '../Pages/Dashboard/Common/Profile';
import Statistics from '../Pages/Dashboard/Common/Statistics';
import MyOrders from '../Pages/Dashboard/Customer/MyOrders';
import PriceTrends from '../Pages/Dashboard/Customer/PriceTrends';
import WatchlistManager from '../Pages/Dashboard/Customer/WatchListManager';
import AddAdvertisement from '../Pages/Dashboard/Seller/AddAdvertisement';
import AddBazar from '../Pages/Dashboard/Seller/AddBazar';
import ManageOrders from '../Pages/Dashboard/Seller/ManageOrders';
import MyAdvertisements from '../Pages/Dashboard/Seller/MyAdvertisement';
import MyInventory from '../Pages/Dashboard/Seller/MyInventory';
import MyProducts from '../Pages/Dashboard/Seller/MyProducts';
import UpdateAdvertisement from '../Pages/Dashboard/Seller/UpdateAdvertisement';
import Home from '../Pages/Home/Home/Home';
import Offers from '../Pages/Offers/Offers';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import AdminRoute from '../routes/AdminRoute';
import PrivateRoute from '../routes/PrivateRoute';
import SellerRoute from '../routes/SellerRoute';
import DashLayout from '../layouts/DashLayout';
import ErrorPage from '../shared/ErrorPage/ErrorPage';
import { axiosSecure } from '../hooks/useAxiosSecure';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                Component: Home,
                loader: () =>
                    fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/markets/approved/limit`,
                    ),
            },
            {
                path: '/market/:id',
                element: (
                    <PrivateRoute>
                        <ProductDetails />
                    </PrivateRoute>
                ),
                // loader: async ({ params }) => {
                //     const res = await axiosSecure.get(`/market/${params.id}`);
                //     return res.data;
                // },
            },
            {
                path: '/allProducts',
                Component: AllProducts,
                // loader: () =>
                //     fetch(`${import.meta.env.VITE_API_URL}/markets/approved`),
            },
            {
                path: '/offers',
                Component: Offers,
            },
        ],
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                Component: Statistics,
            },
            {
                path: 'add-market',
                element: (
                    <SellerRoute>
                        <AddBazar />
                    </SellerRoute>
                ),
            },
            {
                path: 'add-market/:id',
                element: (
                    <SellerRoute>
                        <UpdateProductForm />
                    </SellerRoute>
                ),
            },

            {
                path: 'my-inventory',
                element: (
                    <SellerRoute>
                        <MyInventory />
                    </SellerRoute>
                ),
            },
            {
                path: 'add-advertisement',
                element: (
                    <SellerRoute>
                        <AddAdvertisement />
                    </SellerRoute>
                ),
            },
            {
                path: 'my-advertisement',
                element: (
                    <SellerRoute>
                        <MyAdvertisements />
                    </SellerRoute>
                ),
            },
            {
                path: 'update-ad/:id',
                element: (
                    <SellerRoute>
                        <UpdateAdvertisement />
                    </SellerRoute>
                ),
            },

            {
                path: 'manage-users',
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },

            {
                path: 'all-advertisements',
                element: (
                    <AdminRoute>
                        <AllAdvertisements />
                    </AdminRoute>
                ),
            },
            {
                path: 'all-orders',
                element: (
                    <AdminRoute>
                        <AllOrders />
                    </AdminRoute>
                ),
            },
            {
                path: 'all-products',
                element: (
                    <AdminRoute>
                        <AdminAllProduct />
                    </AdminRoute>
                ),
            },

            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'my-orders',
                Component: MyOrders,
            },
            {
                path: 'watchlist',
                element: <WatchlistManager />,
            },
            {
                path: 'price-trends',
                element: <PriceTrends />,
            },

            {
                path: 'manage-orders',
                element: (
                    <SellerRoute>
                        <ManageOrders />
                    </SellerRoute>
                ),
            },
            {
                path: 'my-products',
                element: (
                    <SellerRoute>
                        <MyProducts />
                    </SellerRoute>
                ),
            },
        ],
    },
]);
