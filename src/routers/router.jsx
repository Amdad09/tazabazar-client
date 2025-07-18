import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayouts from '../layouts/MainLayouts';
import AllProducts from '../Pages/AllProducts/AllProducts';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import Profile from '../Pages/Dashboard/Common/Profile';
import Statistics from '../Pages/Dashboard/Common/Statistics';
import MyOrders from '../Pages/Dashboard/Customer/MyOrders';
import AddBazar from '../Pages/Dashboard/Seller/AddBazar';
import ManageOrders from '../Pages/Dashboard/Seller/ManageOrders';
import MyInventory from '../Pages/Dashboard/Seller/MyInventory';
import Home from '../Pages/Home/Home/Home';
import Offers from '../Pages/Offers/Offers';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import AdminRoute from '../routes/AdminRoute';
import PrivateRoute from '../routes/PrivateRoute';
import SellerRoute from '../routes/SellerRoute';
import PriceTrends from '../Pages/Dashboard/Customer/PriceTrends';
import WatchlistManager from '../Pages/Dashboard/Customer/WatchListManager';
import AllAdvertisements from '../Pages/Dashboard/Admin/AllAdvertisements';
import AllProduct from '../Pages/Dashboard/Admin/AllProduct';
import AllOrders from '../Pages/Dashboard/Admin/AllOrders';
import MyProducts from '../Pages/Dashboard/Seller/MyProducts';
import AddAdvertisement from '../Pages/Dashboard/Seller/AddAdvertisement';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                path: '/',
                Component: Home,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/markets`),
            },
            {
                path: '/market/:id',
                element: (
                    <PrivateRoute>
                        <ProductDetails />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_API_URL}/market/${params.id}`,
                    ),
            },
            {
                path: '/allProducts',
                Component: AllProducts,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/markets`),
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
                <DashboardLayout />
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
                path: 'my-inventory',
                element: (
                    <SellerRoute>
                        <MyInventory />
                    </SellerRoute>
                ),
            },
            {
                path: 'manage-users',
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: 'all-product',
                element: (
                    <AdminRoute>
                        <AllProduct />
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
            {
                path: 'add-advertisement',
                element: (
                    <SellerRoute>
                        <AddAdvertisement />
                    </SellerRoute>
                ),
            },
        ],
    },
]);
