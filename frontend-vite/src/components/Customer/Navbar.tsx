import { Link, useLoaderData } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { LoginResponse } from "../../services/auth/auth.type";
import secureLocalStorage from "react-secure-storage";
import { SESSION_KEY } from "../../lib/utils";
import defaultImage from "../../assets/DefaultUserIcon.png";

const MenuList = () => {
  return (
    <div className="hidden lg:flex gap-3 justify-between items-center ">
      <Link
        to="/"
        className="hover:text-pink-600 transition-colors ease-in-out duration-300"
      >
        Home
      </Link>
      <Link
        to="/my-ticket"
        className="hover:text-pink-600 transition-colors ease-in-out duration-300"
      >
        My Ticket
      </Link>
      <Link
        to="/wallet"
        className="hover:text-pink-600 transition-colors ease-in-out duration-300"
      >
        Wallet
      </Link>
    </div>
  );
};

const MyProfile = () => {
  const { user } = useLoaderData() as LoginResponse;
  return (
    <div className="flex justify-between items-center gap-3">
      <h1 className="text-pink-600 font-semibold md:text-base text-sm">
        Halo, {user.name.split(" ")[0]}!
      </h1>
      {!user ? (
        <Button asChild className="rounded-full text-white font-bold">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      ) : (
        <DropdownMenuList />
      )}
    </div>
  );
};

const DropdownMenuList = () => {
  const handleLogout = async () => {
    secureLocalStorage.removeItem(SESSION_KEY);
    window.location.replace("/sign-in");
  };

  const { user } = useLoaderData() as LoginResponse;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          />
        ) : (
          <img
            src={defaultImage}
            alt={"user"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <div className="block lg:hidden">
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem>My Ticket</DropdownMenuItem>
          <DropdownMenuItem>Wallet</DropdownMenuItem>
        </div>
        <DropdownMenuItem>
          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const handleScroll = () => {
    setIsFixed(window.scrollY > 300);
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className={`${isFixed ? "mb-24" : ""}`} />
      <div
        className={`w-full z-50 ${
          isFixed
            ? "fixed top-0 left-0 right-0 bg-neutral-950 shadow-md transition-all duration-400"
            : ""
        }`}
      >
        <nav
          className={`max-w-6xl h-24 mx-auto py-6 flex justify-between items-center ${
            isFixed ? "px-3" : "px-0"
          }`}
        >
          <div className="flex md:gap-6 gap-3 items-center">
            <Link to="/">
              <h1 className="md:text-3xl text-2xl font-bold text-pink-600">
                Flamingo
              </h1>
            </Link>
            <Input
              className="lg:w-96 lg:block hidden h-12  rounded-full"
              placeholder="Search movies..."
            />
            <div className="block lg:hidden">
              <button className="bg-pink-600 text-white md:p-4 p-2 rounded-full">
                <Search className="md:w-6 md:h-6 w-4 h-4" />
              </button>
            </div>
          </div>
          <ul>
            <li className="flex gap-12">
              <MenuList />
              <MyProfile />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
