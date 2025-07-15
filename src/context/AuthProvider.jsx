import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const socialLogin = () => {
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null)
            }
            setLoading(false);
        })
        return () => unSubscribe();
    },[])
    
    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        logInUser,
        socialLogin,
        updateUser,
        logOut,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
