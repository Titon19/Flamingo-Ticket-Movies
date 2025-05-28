"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 px-8 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-pink-600 inline-block text-sm font-bold sm:text-base"
        >
          Flamingo
        </Link>

        <nav className="hidden space-x-4 md:flex">
          <Link
            href="#features"
            className="text-xs font-medium transition-colors hover:text-primary sm:text-sm"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-xs font-medium transition-colors hover:text-primary sm:text-sm"
          >
            How It Works
          </Link>
          <Link
            href="#showcase"
            className="text-xs font-medium transition-colors hover:text-primary sm:text-sm"
          >
            Showcase
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
