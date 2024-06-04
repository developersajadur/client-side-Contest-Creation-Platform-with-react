import DashboardMenus from "@/Dashboard/DashboardMenus/DashboardMenus";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import {  NavLink, Outlet } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoard = () => {
    const navLinks = (
        <>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/challenges">challenges</NavLink></li>
        </>
      );
    const {user} = useAuth();
    return (
        <div className="flex w-full h-full">
        <ScrollArea className="w-[25%] h-screen bg-[#3E54A3]">
           <DashboardMenus></DashboardMenus>
        </ScrollArea >
        <ScrollArea className="w-[75%] px-16 h-screen">
            <div className="w-full mt-10 flex justify-between items-center">
                <h1 className="text-4xl font-semibold text-[#151515]">DASHBOARD</h1>
                <Sheet>
          <SheetTrigger><GiHamburgerMenu className="text-2xl" /></SheetTrigger>
          <SheetContent side="right" className="bg-black text-white">
            <SheetHeader>
              <SheetTitle className="text-3xl mb-8">Go back home</SheetTitle>
            </SheetHeader>
            <ul className="space-y-2">{navLinks}</ul>
          </SheetContent>
        </Sheet>
            </div>
            <Outlet></Outlet>
        </ScrollArea >
    </div>
    );
};

export default DashBoard;