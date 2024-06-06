import useAuth from "@/Hooks/useAuth";
import { FaBook, FaCalendarAlt, FaHome, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { IoMdAddCircleOutline, IoMdMail } from "react-icons/io";
import { MdOutlinePayment, MdPayment } from "react-icons/md";
import { TbBasketStar, TbShoppingCartCheck } from "react-icons/tb";
import { TfiMenu, TfiMenuAlt } from "react-icons/tfi";
import { NavLink } from 'react-router-dom';

const DashboardMenus = () => {
    const {user} = useAuth();
    const isAdmin = true;
    return (
        <div className="bg-[#3E54A3] px-4 py-6 ">
            <div className="flex flex-col justify-center items-center">
                <img src={user?.photoURL} alt="profile" className="h-44 w-44 rounded-full" />
                <h1 className="text-3xl font-semibold text-[#FAFAFA] mt-2">{user?.displayName}</h1>
                <h6 className="text-lg text-[#FAFAFA]">{user?.email}</h6>
            </div>

            <ul className="flex flex-col gap-4 mt-10  uppercase">
            {
                isAdmin ? <>
                    <li><NavLink to="/dashboard" className="flex gap-2 w-fit items-center text-lg font-medium text-[#FAFAFA]"><FaHome className="text-xl" /> Admin Home</NavLink></li>
                <li><NavLink to="/dashboard/add-contest" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><IoMdAddCircleOutline className="text-xl" /> add contest</NavLink></li>
                <li><NavLink to="/dashboard/manage-contests" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><TfiMenuAlt className="text-xl" /> manage Contest</NavLink></li>
                <li><NavLink to="/dashboard/users" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><FaUsers className="text-xl" />manage users</NavLink></li>
                <li><NavLink to="/dashboard/manage-payments" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><MdPayment className="text-xl" />manage payments</NavLink></li>
                </>
                :
                <>
                    <li><NavLink to="" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><FaHome className="text-xl" /> User Home</NavLink></li>
                <li><NavLink to="" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><FaCalendarAlt className="text-xl" /> reservation</NavLink></li>
                <li><NavLink to="" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><MdOutlinePayment  className="text-xl" /> payment history</NavLink></li>
                <li><NavLink to="/dashboard/my-card" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><FaShoppingCart className="text-xl" /> my cart</NavLink></li>
                <li><NavLink to="" className="flex gap-2 w-fit items-center text-lg font-medium text-[#FAFAFA]"><TbBasketStar className="text-xl" />add review</NavLink></li>
                <li><NavLink to="" className="flex w-fit gap-2 items-center text-lg font-medium text-[#FAFAFA]"><TbShoppingCartCheck className="text-xl" />my booking</NavLink></li>
                </>
            }
            </ul>
        </div>
    );
};

export default DashboardMenus;