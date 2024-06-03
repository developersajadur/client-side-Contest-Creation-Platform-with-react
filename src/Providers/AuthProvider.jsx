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
        }
            return createUserWithEmailAndPassword(auth, email, password);
        }

    // update user

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
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    // Google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Twitter login
    const twitterLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, twitterProvider);
    };

    // Facebook login
    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    // Log out User
    const logOutUser = async () => {
        await signOut(auth);
        toast.success('Logged out successfully');
        setUser(null);
    };

    // Observer
    useEffect(() => {
        const unSubscribeUser = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser || null);
            if(currentUser){
                const userInfo = {email : currentUser.email}
                axiosPublic.post("/jwt", userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem("token", res.data.token);
                    }
                })
            }else{
                localStorage.removeItem("token");
            }
        });

        return () => {
            unSubscribeUser();
        };
    }, []);

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
