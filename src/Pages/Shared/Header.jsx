import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import useAuth from "@/Hooks/useAuth";
  const {user} = useAuth
  

const Header = () => {
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/">Contact</NavLink></li>
            <li><NavLink to="/">Shop</NavLink></li>
        </>
    );
    
    return (
        <div className="w-full flex justify-between h-20 items-center bg-slate-500 px-1 lg:px-10">
            <div className="block lg:hidden">
                <Sheet>
                    <SheetTrigger><GiHamburgerMenu className="text-2xl" /></SheetTrigger>
                    <SheetContent side="left" className="bg-black text-white">
                        <SheetHeader>
                            <SheetTitle className="text-3xl">Contest</SheetTitle>
                        </SheetHeader>
                        <ul className="space-y-4">{navLinks}</ul>
                    </SheetContent>
                </Sheet>
            </div>
            <h1 className="text-3xl font-bold">Contest</h1>
            <div className="hidden lg:block">
                <ul className="flex gap-8 font-semibold sm:list-none text-lg">
                    {navLinks}
                </ul>
            </div>
          {
            user?(
                <Button className="bg-orange-500 hover:bg-red-500 rounded-[5px]" variant="destructive">Login</Button>
            ) : (
                <Button className="bg-orange-500 hover:bg-red-500 rounded-[5px]" variant="destructive">Log Out</Button>
            )
          }
        </div>
    );
};

export default Header;
