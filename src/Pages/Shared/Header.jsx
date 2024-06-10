import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuth from "@/Hooks/useAuth";

const Header = () => {
  const { user, logOutUser } = useAuth();
  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/challenges">challenges</NavLink></li>
      <li><NavLink to="/leader-board">Leader Board</NavLink></li>
    </>
  );

  const handleLogOut = () => {
    logOutUser();
  };

  return (
    <div className="w-full flex justify-between h-20 items-center bg-white border-b-[2px] px-1 lg:px-10">
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
      <Link className="" to="/"><img className="w-60" src="/image/logo.png" alt="logo" /></Link>
      <div className="hidden lg:block">
        <ul className="flex uppercase gap-8 font-semibold sm:list-none text-lg">
          {navLinks}
        </ul>
      </div>
      {
        user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img className="h-14 w-14 cursor-pointer rounded-full" src={user?.photoURL} alt="User" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black text-xl font-semibold">
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/add-contest">Add Contest</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
         <Link to="/login"> <Button className="bg-orange-500 hover:bg-red-500 rounded-[5px]" variant="destructive">Login</Button></Link>
        )
      }
    </div>
  );
};

export default Header;
