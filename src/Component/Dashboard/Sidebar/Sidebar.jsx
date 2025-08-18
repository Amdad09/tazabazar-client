import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { FcSettings } from 'react-icons/fc';
import { GrLogout } from 'react-icons/gr';
import { Link } from 'react-router';
import logo from '../../../assets/logo.png';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import Logo from '../../../shared/Logo/Logo';
import AdminMenu from './Menu/AdminMenu';
import CustomerMenu from './Menu/CustomerMenu';
import MenuItem from './Menu/MenuItem';
import SellerMenu from './Menu/SellerMenu';

const Sidebar = () => {
    const { logOut } = useAuth();
    const [role] = useRole();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* ✅ Mobile Top Bar */}
            <div className="hidden justify-between items-center   shadow px-4 py-3 sticky top-0 z-50">
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-10" />
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl  "
                >
                    <AiOutlineBars />
                </button>
            </div>

            {/* ✅ Sidebar for All Screens */}
            <div
                className={`fixed top-0 left-0 h-full w-64   shadow-lg z-40 min-h-screen bg-card text-black
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:block`}
            >
                <div className="flex flex-col min-h-screen justify-between p-4">
                    {/* Top Section */}
                    <div>
                        {/* ✅ Logo */}
                        <div className="border-b pb-2 border-primary">
                            <Logo />
                        </div>

                        {/* ✅ Menus */}
                        <nav className="space-y-2">
                            {role === 'customer' && <CustomerMenu />}
                            {role === 'seller' && <SellerMenu />}
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>

                    {/* ✅ Bottom Section - always at the bottom */}
                    <div className="border-t pt-4">
                        <MenuItem
                            icon={FcSettings}
                            label="Profile"
                            address="/dashboard/profile"
                        />
                        <button
                            onClick={logOut}
                            className="flex items-center w-full gap-3 px-4 py-2 hover:bg-gray-200 rounded transition mt-2"
                        >
                            <GrLogout className="text-lg" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
