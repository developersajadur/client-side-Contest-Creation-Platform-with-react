import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header";
import Footer from "../Pages/Shared/Footer";

const Root = () => {
    return (
        <div>
            <Header></Header>
            <div className="lg:max-w-[1240px] mx-auto">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;