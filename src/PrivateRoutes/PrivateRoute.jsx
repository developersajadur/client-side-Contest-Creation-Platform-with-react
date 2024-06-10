import useAuth from "@/Hooks/useAuth";
import {Navigate , useLocation} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user , loading} = useAuth();

    if(loading){
        return <div className="text-center mt-20">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if(!user){
        return <Navigate to="/login" state={location?.pathname || "/"}/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;