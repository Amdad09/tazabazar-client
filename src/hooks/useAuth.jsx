import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    
    return use(AuthContext);
};

export default useAuth;