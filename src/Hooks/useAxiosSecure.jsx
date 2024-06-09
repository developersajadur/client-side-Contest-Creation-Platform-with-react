import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Create an instance of Axios with a base URL
export const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.authorization = token; 
                }
                return config;
            }
        );

        // Response Interceptor
        axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                console.error('Response error:', error);
                const status = error.response ? error.response.status : null;
                if (status === 401) {
                    localStorage.removeItem("token");
                    await logOutUser();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );
    }, [logOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
