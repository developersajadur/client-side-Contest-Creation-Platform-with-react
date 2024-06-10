import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Create an instance of Axios with a base URL
const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor
        axiosSecure.interceptors.request.use(function(config) {
                const token = localStorage.getItem('token');
                // console.log(token);
                    config.headers.authorization = `Bearer ${token}`;

                return config;
            },
            (error) => {
                return Promise.reject(error);
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
