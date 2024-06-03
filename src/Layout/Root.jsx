import { Outlet, useLocation } from "react-router-dom";
import Header from "../Pages/Shared/Header";
import Footer from "../Pages/Shared/Footer";

const Root = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("/dashboard");

    return (
        <div>
            {!noHeaderFooter && <Header />}
            <div className={noHeaderFooter ? "" : "lg:max-w-[1240px] mx-auto"}>
                <Outlet />
            </div>
            {!noHeaderFooter && <Footer />}
        </div>
    );
};

export default Root;
