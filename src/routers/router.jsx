import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayouts from '../layouts/MainLayouts';
import AllProducts from '../Pages/AllProducts/AllProducts';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register';
import Home from '../Pages/Home/Home/Home';
import Offers from '../Pages/Offers/Offers';
import PrivateRoute from '../routes/PrivateRoute';
import Statistics from '../Pages/Dashboard/Common/Statistics';
import AddBazar from '../Pages/Dashboard/Seller/AddBazar';
import MyInventory from '../Pages/Dashboard/Seller/MyInventory';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import Profile from '../Pages/Dashboard/Common/Profile';
import ManageOrders from '../Pages/Dashboard/Seller/ManageOrders';
import MyOrders from '../Pages/Dashboard/Customer/MyOrders';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';

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
                element: <ProductDetails />,
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
                element: (
                    <PrivateRoute>
                        <Statistics />
                    </PrivateRoute>
                ),
            },
            {
                path: 'add-market',
                element: (
                    <PrivateRoute>
                        <AddBazar />
                    </PrivateRoute>
                ),
            },
            {
                path: 'my-inventory',
                element: (
                    <PrivateRoute>
                        <MyInventory />
                    </PrivateRoute>
                ),
            },
            {
                path: 'manage-users',
                element: (
                    <PrivateRoute>
                        <ManageUsers />
                    </PrivateRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: 'my-orders',
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
            },
            {
                path: 'manage-orders',
                element: <ManageOrders />,
            },
        ],
    },
]);
