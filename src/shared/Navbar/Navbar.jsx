import { FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Logo from '../Logo/Logo';
import './Navbar.css'
const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

   const handleLogout = () => {
       logOut() // Firebase logout
           .then(() => {
               localStorage.removeItem('access-token'); 
               navigate('/');
           })
           .catch((err) => console.error(err));
   };


    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allProducts">All Products</NavLink>
            </li>
            <li>
                <NavLink to="/offers">Offers</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-gray-50  px-4 fixed top-0 left-0 w-full z-50">
            {/* Left: Logo */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[999]"
                    >
                        {links}
                        {!user && (
                            <>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Sign Up</NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600"
                                    >
                                        <FaSignOutAlt className="inline mr-1" />{' '}
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <button className="normal-case hidden md:block text-xl">
                    <Logo />
                </button>
            </div>

            {/* Center: Horizontal menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right: Auth Buttons */}
            <div className="navbar-end space-x-3">
                {!user && (
                    <>
                        <NavLink to="/login" className="btn btn-sm btn-outline">
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn btn-sm btn-primary text-secondary"
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}
                {user && currentPath !== '/dashboard' && (
                    <>
                        <NavLink
                            to="/dashboard"
                            className="btn btn-sm btn-primary text-secondary"
                        >
                            Dashboard
                        </NavLink>
                        <div
                            className="tooltip tooltip-left cursor-pointer"
                            data-tip={user?.displayName || 'User'}
                        >
                            <Link to="/dashboard/profile">
                                {' '}
                                <img
                                    src={
                                        user?.photoURL ||
                                        'https://i.ibb.co/6JqFhY4t/default-image.jpg'
                                    }
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                    className="w-10 h-10 rounded-full border-2 border-primary shadow-md"
                                />
                            </Link>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm hidden lg:block btn-error text-white"
                        >
                            <div className="flex items-center">
                                <FaSignOutAlt className="mr-1" /> Logout
                            </div>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
