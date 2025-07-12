import React from 'react';
import { Outlet } from 'react-router';
import loginImage from '../../src/assets/Login-bro.svg';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar/Navbar';

const imageVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 50,
            damping: 15,
        },
    },
};

const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <motion.div
                        className="text-center lg:text-left w-[500px]"
                        initial="hidden"
                        animate={{
                            opacity: [1, 2, 1],
                            scale: [1, 1.05, 1],
                            x: [2, 10, 2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        variants={imageVariants}>
                        <img
                            src={loginImage}
                            alt="Login side illustration"
                            className="drop-shadow-lg rounded-lg"
                        />
                    </motion.div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
