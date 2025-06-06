"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import defaultImage from "@/public/DefaultUserIcon.png";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import Link from "next/link";
import Image from "next/image";
import useLogout from "@/hooks/useLogout";
import { Skeleton } from "../ui/skeleton";
import SearchCommand from "./searchCommand";

const MenuList = () => {
  return (
    <div className="hidden lg:flex gap-3 justify-between items-center">
      <Link
        href="/"
        className="hover:text-pink-600 transition-colors ease-in-out duration-300"
      >
        Home
      </Link>
    </div>
  );
};
const MenuListAuth = ({
  meAuth,
  isLoading,
}: {
  meAuth: AuthData;
  isLoading: boolean;
}) => {
  return (
    <div className="hidden lg:flex gap-3 justify-between items-center">
      {isLoading ? (
        <Skeleton className="w-24 h-6 rounded-full" />
      ) : (
        <>
          <Link
            href="/"
            className="hover:text-pink-600 transition-colors ease-in-out duration-300"
          >
            Home
          </Link>
          <Link
            href="/my-ticket"
            className="hover:text-pink-600 transition-colors ease-in-out duration-300"
          >
            My Ticket
          </Link>
          <Link
            href="/my-wallet"
            className="hover:text-pink-600 transition-colors ease-in-out duration-300"
          >
            My Wallet
          </Link>
        </>
      )}
    </div>
  );
};

// const MyProfile = () => {
//   const { data: meAuth, isLoading } = useFetchUserAuth();
//   return (
//     <div className="flex justify-between items-center gap-3">
//       {meAuth && (
//         <h1 className="text-pink-600 font-semibold md:text-base text-sm">
//           Halo, {meAuth?.name.split(" ")[0]}!
//         </h1>
//       )}
//       {isLoading ? (
//         <div className="flex items-center space-x-2">
//           <div className="space-y-2">
//             <Skeleton className="h-4 w-[100px]" />
//           </div>
//           <Skeleton className="h-12 w-12 rounded-full" />
//         </div>
//       ) : !meAuth ? (
//         <Button
//           asChild
//           className="rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold"
//         >
//           <Link href="/auth/sign-in">Sign In</Link>
//         </Button>
//       ) : (
//         <DropdownMenuList meAuth={meAuth} />
//       )}
//     </div>
//   );
// };
const MyProfileAuth = ({
  meAuth,
  isLoading,
}: {
  meAuth: AuthData;
  isLoading: boolean;
}) => {
  return (
    <div className="flex justify-between items-center gap-3">
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      ) : (
        <>
          <h1 className="text-pink-600 font-semibold md:text-base text-sm">
            Halo, {meAuth?.name.split(" ")[0]}!
          </h1>
          {meAuth && <DropdownMenuList meAuth={meAuth} />}
        </>
      )}
    </div>
  );
};
const MyProfile = () => {
  return (
    <div className="flex justify-between items-center gap-2 bg-neutral-800 rounded-full p-3">
      <Button
        asChild
        className="rounded-full text-black hover:bg-pink-500 hover:text-white font-bold"
      >
        <Link href="/auth/sign-in">Sign In</Link>
      </Button>
      <Button
        asChild
        className="rounded-full text-black hover:bg-pink-500 hover:text-white font-bold"
      >
        <Link href="/auth/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
};

interface AuthData {
  photoUrl: string;
  name: string;
}

interface DropdownMenuListProps {
  meAuth: AuthData;
}

const DropdownMenuList = ({ meAuth }: DropdownMenuListProps) => {
  const { onSubmit, isPending } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {meAuth?.photoUrl ? (
          <img
            src={meAuth?.photoUrl}
            alt={meAuth?.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          />
        ) : (
          <Image
            src={defaultImage}
            alt={"user"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <div className="block lg:hidden">
          <DropdownMenuItem>
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-ticket">My Ticket</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-wallet">My Wallet</Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuItem>
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="cursor-pointer"
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = ({ hasToken }: { hasToken: boolean }) => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const handleScroll = () => {
    setIsFixed(window.scrollY > 300);
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: meAuth, isLoading } = useFetchUserAuth();
  return (
    <header className="max-w-6xl mx-auto px-3">
      <div className={`${isFixed ? "mb-24" : ""}`} />
      <nav
        className={`w-full z-50 ${
          isFixed
            ? "fixed top-0 left-0 right-0 bg-neutral-950 shadow-md transition-all duration-400"
            : ""
        }`}
      >
        <div
          className={`z-50 max-w-6xl h-24 mx-auto py-6 flex justify-between items-center ${
            isFixed ? "px-3" : "px-0"
          }`}
        >
          <div className="flex md:gap-6 gap-3 items-center">
            <Link href="/">
              <h1 className="md:text-3xl text-2xl font-bold text-pink-600">
                Flamingo
              </h1>
            </Link>

            <SearchCommand />
          </div>
          <ul>
            <li className="flex gap-6">
              {hasToken ? (
                <>
                  <MenuListAuth
                    meAuth={meAuth as AuthData}
                    isLoading={isLoading}
                  />
                  <MyProfileAuth
                    meAuth={meAuth as AuthData}
                    isLoading={isLoading}
                  />
                </>
              ) : (
                <>
                  <MenuList />
                  <MyProfile />
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
