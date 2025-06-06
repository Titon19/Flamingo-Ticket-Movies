import Footer from "@/components/Customer/Footer";
import Navbar from "@/components/Customer/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Providers from "@/components/query-provider";
import React from "react";
import "../globals.css";
import { cookies } from "next/headers";
const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("secretToken");

  return (
    <Providers>
      <ProgressBar />
      <header className="max-w-6xl mx-auto px-3"></header>
      <Navbar hasToken={hasToken} />
      <main className="max-w-6xl mx-auto px-3 overflow-hidden">{children}</main>
      <Footer />
    </Providers>
  );
};

export default CustomerLayout;
