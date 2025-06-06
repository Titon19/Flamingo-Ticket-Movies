import Link from "next/link";
import React from "react";

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-950 px-8 min-h-screen text-white">
      <div className="max-w-6xl mx-auto py-6">
        <Link href="/">
          <h1 className="text-3xl font-bold text-pink-600">Flamingo</h1>
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="pb-12">
            <h1 className="text-2xl font-bold text-pink-600">Sign In</h1>
            <p>Please Sign In to your account in the Flamingo.</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SignInLayout;
