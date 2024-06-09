import useAxiosPublic from "@/Hooks/useAxiosPublic";
import auth from "../../firebase.config";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext(null);

// Social auth providers
const twitterProvider = new TwitterAuthProvider();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Password validation regex
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // Create User
    const createUser = (email, password) => {
        if (!passwordRegex.test(password)) {
            toast.error('Weak password');
            return Promise.reject(new Error('Weak password'));
        }
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update user profile
    const updateUserProfile = (image, name) => {
        return updateProfile(auth.currentUser, {
            photoURL: image,
            displayName: name
        });
    }

    // Sign in User
    const signInUser = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error(error.message);
            return await Promise.reject(error);
        }
    };

    // Google login
    const googleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };

    // Twitter login
    const twitterLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, twitterProvider);
        } finally {
            setLoading(false);
        }
    };

    // Facebook login
    const facebookLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, facebookProvider);
        } finally {
            setLoading(false);
        }
    };

    // Log out User
    const logOutUser = async () => {
        await signOut(auth);
        toast.success('Logged out successfully');
        setUser(null);
        localStorage.removeItem("token");
    };

    // Observer
    useEffect(() => {
        const unSubscribeUser = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser || null);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("token", res.data.token);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                localStorage.removeItem("token");
            }
        });

        return () => {
            unSubscribeUser();
        };
    }, [axiosPublic]);

    const contextValue = {
        user,
        createUser,
        signInUser,
        logOutUser,
        facebookLogin,
        googleLogin,
        twitterLogin,
        loading,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
