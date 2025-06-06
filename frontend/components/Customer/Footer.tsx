import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Sosmed {
  id: string;
  href: string;
  icon: React.ReactNode;
}

const listSosmed: Sosmed[] = [
  {
    id: "1",
    href: "",
    icon: <Instagram className="w-8 h-8" />,
  },
  {
    id: "2",
    href: "",
    icon: <Linkedin className="w-8 h-8" />,
  },
  {
    id: "3",
    href: "",
    icon: <Github className="w-8 h-8" />,
  },
];

const Footer = () => {
  return (
    <footer className="max-w-6xl px-4 overflow-hidden mx-auto py-6 flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-3xl font-bold text-pink-600">
            My Social Media
          </h1>
          <div className="flex gap-3">
            {listSosmed.map((sosmed) => (
              <Link
                className="hover:text-pink-600 transition-colors duration-300 ease-in-out"
                href={sosmed.href}
                key={sosmed.id}
              >
                {sosmed.icon}
              </Link>
            ))}
          </div>
          <p className=" text-sm md:text-md">
            Copyright {new Date().getFullYear()} - Flamingo. All Rights
            Reserved.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="md:text-md font-bold text-pink-600">Navigation</h3>
          <Link
            href="/"
            className="md:text-md font-semibold hover:text-pink-600 transition-colors duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/my-wallet"
            className="md:text-md font-semibold hover:text-pink-600 transition-colors duration-300 ease-in-out"
          >
            My Wallet
          </Link>
          <Link
            href="/my-ticket"
            className="md:text-md font-semibold hover:text-pink-600 transition-colors duration-300 ease-in-out"
          >
            My Ticket
          </Link>
          <Link
            href="/profile"
            className="md:text-md font-semibold hover:text-pink-600 transition-colors duration-300 ease-in-out"
          >
            Profile
          </Link>
        </div>
      </div>
      <h1 className="text-[100px] md:text-[250px] font-bold outline-text">
        Flamingo
      </h1>
    </footer>
  );
};

export default Footer;
