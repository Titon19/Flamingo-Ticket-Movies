import ProgressBar from "@/components/ProgressBar";
import Providers from "@/components/query-provider";
import React from "react";
import "./globals.css";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ProgressBar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
