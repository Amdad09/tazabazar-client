
import React from 'react';
import logoImage from '../../assets/logo.png'
import { motion } from 'framer-motion';
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to='/'>
            <motion.div
                className="manufact flex items-center gap-3 cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}>
                <img
                    src={logoImage}
                    alt="TazaBazar 360 Logo"
                    className="w-10 h-10 rounded-full border-2 border-primary shadow-md"
                />
                <h3 className="text-xl md:text-2xl  text-primary">
                    TazaBazar 360
                </h3>
            </motion.div>
        </Link>
    );
};

export default Logo;
