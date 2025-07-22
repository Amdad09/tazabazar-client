import React from 'react';
import { Outlet } from 'react-router'; // Correct router import
import Sidebar from '../Component/Dashboard/Sidebar/Sidebar';
import Logo from '../shared/Logo/Logo';
import Footer from '../shared/Footer/Footer';

const DashLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            {/* ✅ Drawer Toggle Checkbox */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* ✅ Mobile Top Navbar */}
                <div className="w-full fixed top-0 z-30 navbar bg-green-100 lg:hidden">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-square btn-ghost"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    {/* <span className="ml-2 font-bold text-lg">Dashboard</span> */}
                    <Logo />
                </div>

                {/* ✅ Main Page Content */}
                <div>
                    <div className="p-1 mb-12 pt-16 lg:pt-3">
                        <Outlet />
                    </div>
                    
                    <Footer />
                </div>
            </div>

            {/* ✅ Sidebar Drawer */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashLayout;
