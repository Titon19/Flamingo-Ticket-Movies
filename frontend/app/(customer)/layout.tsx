import Navbar from "@/components/Customer/Navbar";
import React from "react";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="max-w-6xl mx-auto px-3">
        <Navbar />
      </header>
      <main className="max-w-6xl mx-auto px-3 overflow-hidden">{children}</main>
    </>
  );
};

export default CustomerLayout;
